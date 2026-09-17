import { Component, effect, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFormField } from '../../../core/models/contact-form';
import { ContactFormsService } from '../../../core/services/contact-forms';
import { Button } from '../../../shared/components/button/button';
import { Checkbox } from '../../../shared/components/checkbox/checkbox';
import { Input } from '../../../shared/components/input/input';
import { Toggle } from '../../../shared/components/toggle/toggle';
import { getControlError } from '../../../shared/utils/form-error';

@Component({
  imports: [Button, Input, Toggle, Checkbox, FormsModule, ReactiveFormsModule],
  selector: 'app-contact-form',
  styleUrl: './formulario-contacto.css',
  templateUrl: './formulario-contacto.html',
})
export class ContactForm {
  private readonly contactFormsService = inject(ContactFormsService);
  private readonly fb = inject(FormBuilder);

  readonly created = output<void>();

  protected readonly loading = signal(false);
  protected readonly customTerms = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    thankYouMessage: ['¡Gracias!', [Validators.required]],
    termsUrl: [''],
  });

  protected readonly fields = signal<ContactFormField[]>([
    { key: 'fullName', label: 'Nombres y apellidos', show: true, required: false },
    { key: 'phone', label: 'Número de teléfono', show: false, required: false },
    { key: 'email', label: 'Correo electrónico', show: false, required: true },
    { key: 'company', label: 'Nombre de empresa', show: true, required: true },
    { key: 'country', label: 'País', show: true, required: true },
    { key: 'message', label: 'Mensaje', show: true, required: true },
  ]);

  constructor() {
    effect(() => {
      const termsUrlControl = this.form.controls.termsUrl;
      if (this.customTerms()) {
        termsUrlControl.addValidators(Validators.required);
      } else {
        termsUrlControl.clearValidators();
      }
      termsUrlControl.updateValueAndValidity({ emitEvent: false });
    });
  }

  protected errorFor(name: keyof typeof this.form.controls, messages: Record<string, string>): string {
    return getControlError(this.form.controls[name], messages);
  }

  protected toggleShow(key: string, value: boolean): void {
    this.fields.update((fields) => fields.map((field) => (field.key === key ? { ...field, show: value } : field)));
  }

  protected toggleRequired(key: string, value: boolean): void {
    this.fields.update((fields) =>
      fields.map((field) => (field.key === key ? { ...field, required: value } : field)),
    );
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { name, thankYouMessage, termsUrl } = this.form.getRawValue();

    this.contactFormsService
      .createContactForm({
        name,
        fields: this.fields(),
        thankYouMessage,
        customTerms: this.customTerms(),
        termsUrl,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.created.emit();
        },
        error: () => this.loading.set(false),
      });
  }
}
