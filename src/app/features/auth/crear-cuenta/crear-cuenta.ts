import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { getControlError } from '../../../shared/utils/form-error';

@Component({
  selector: 'app-create-account',
  imports: [Button, Input, RouterLink, ReactiveFormsModule],
  templateUrl: './crear-cuenta.html',
  styleUrl: './crear-cuenta.css',
})
export class CreateAccount {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
      ],
    ],
  });

  protected errorFor(name: keyof typeof this.form.controls, messages: Record<string, string>): string {
    return getControlError(this.form.controls[name], messages);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, username, password } = this.form.getRawValue();

    this.authService.register({ email, username, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.loading.set(false),
    });
  }
}
