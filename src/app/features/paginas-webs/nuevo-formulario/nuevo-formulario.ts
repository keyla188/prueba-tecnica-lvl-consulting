import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryType } from '../../../core/models/category';
import { CategoriesService } from '../../../core/services/categories';
import { ImageUploadService } from '../../../core/services/image-upload';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Select } from '../../../shared/components/select/select';
import { Textarea } from '../../../shared/components/textarea/textarea';
import { getControlError } from '../../../shared/utils/form-error';

const COMPANIES = ['Administrador', 'Recursos humanos', 'Estudios contables', 'Logística'];
const TYPES: CategoryType[] = ['Imágenes', 'Documento', 'Videos'];

@Component({
  imports: [ReactiveFormsModule, Button, Input, Select, Textarea],
  selector: 'app-new-category-form',
  styleUrl: './nuevo-formulario.css',
  templateUrl: './nuevo-formulario.html',
})
export class NewCategoryForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly categoriesService = inject(CategoriesService);
  private readonly imageUploadService = inject(ImageUploadService);

  protected readonly companies = COMPANIES;
  protected readonly types = TYPES;

  protected readonly loading = signal(false);
  protected readonly fileName = signal<string | null>(null);
  protected readonly imageUrl = signal<string | null>(null);
  protected readonly isDragging = signal(false);
  protected readonly isUploading = signal(false);
  protected readonly uploadError = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    subtitle: ['', [Validators.required]],
    company: ['', [Validators.required]],
    type: [''],
    description: [''],
  });

  protected errorFor(name: keyof typeof this.form.controls, messages: Record<string, string>): string {
    return getControlError(this.form.controls[name], messages);
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onDragLeave(): void {
    this.isDragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);

    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  protected onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  private uploadFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      this.uploadError.set('Solo se permiten imágenes');
      return;
    }

    this.fileName.set(file.name);
    this.uploadError.set(null);
    this.isUploading.set(true);

    this.imageUploadService.uploadImage(file).subscribe({
      next: (url) => {
        this.imageUrl.set(url);
        this.isUploading.set(false);
      },
      error: () => {
        this.uploadError.set('No se pudo subir la imagen, intenta de nuevo');
        this.fileName.set(null);
        this.isUploading.set(false);
      },
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { name, subtitle, company, type, description } = this.form.getRawValue();

    this.categoriesService
      .createCategory({
        name,
        subtitle,
        company,
        description,
        type: type as CategoryType | '',
        imageUrl: this.imageUrl() ?? undefined,
      })
      .subscribe({
        next: () => this.router.navigate(['/paginas-webs/categorias']),
        error: () => this.loading.set(false),
      });
  }
}
