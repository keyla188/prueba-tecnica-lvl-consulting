import { toSignal } from '@angular/core/rxjs-interop';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoryType } from '../../../core/models/category';
import { CategoriesService } from '../../../core/services/categories';
import { Button } from '../../../shared/components/button/button';
import { Checkbox } from '../../../shared/components/checkbox/checkbox';
import { Modal } from '../../../shared/components/modal/modal';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Select } from '../../../shared/components/select/select';
import { Tag, TagVariant } from '../../../shared/components/tag/tag';
import { Tooltip } from '../../../shared/components/tooltip/tooltip';
import { ContactForm } from '../formulario-contacto/formulario-contacto';

const TYPE_VARIANT: Record<CategoryType, TagVariant> = {
  Imágenes: 'warning',
  Documento: 'success',
  Videos: 'info',
};

@Component({
  imports: [Button, Pagination, Select, Tag, FormsModule, Modal, ContactForm, Checkbox, Tooltip],
  selector: 'app-categories',
  styleUrl: './categorias.css',
  templateUrl: './categorias.html',
})
export class Categories {
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  protected readonly contactFormCategory = signal<Category | null>(null);
  protected readonly isContactFormOpen = computed(() => this.contactFormCategory() !== null);

  protected readonly categories = toSignal(this.categoriesService.getCategories(), { initialValue: [] });

  protected readonly pageSize = signal(10);
  protected readonly currentPage = signal(1);
  protected readonly selectedIds = signal(new Set<number>());

  protected readonly totalItems = computed(() => this.categories().length);

  protected readonly pagedCategories = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.categories().slice(start, start + this.pageSize());
  });

  protected readonly isAllSelected = computed(() => {
    const page = this.pagedCategories();
    return page.length > 0 && page.every((category) => this.selectedIds().has(category.id));
  });

  protected onPageSizeChanged(value: string): void {
    this.pageSize.set(Number(value));
    this.currentPage.set(1);
  }

  protected toggleSelect(id: number): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  protected toggleSelectAll(): void {
    const page = this.pagedCategories();
    const allSelected = this.isAllSelected();

    this.selectedIds.update((current) => {
      const next = new Set(current);
      for (const category of page) {
        if (allSelected) {
          next.delete(category.id);
        } else {
          next.add(category.id);
        }
      }
      return next;
    });
  }

  protected goToNewCategory(): void {
    this.router.navigate(['/paginas-webs/categorias/nuevo']);
  }

  protected openContactForm(category: Category): void {
    this.contactFormCategory.set(category);
  }

  protected closeContactForm(): void {
    this.contactFormCategory.set(null);
  }

  protected variantFor(type: CategoryType): TagVariant {
    return TYPE_VARIANT[type];
  }
}
