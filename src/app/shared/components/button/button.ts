import { Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonType = 'button' | 'submit' | 'reset';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-primary-light text-primary hover:bg-border',
  outline: 'border border-border text-text hover:bg-primary-light',
  danger: 'bg-danger text-white hover:opacity-90',
};

@Component({
  imports: [],
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);

  protected get variantClasses(): string {
    return VARIANT_CLASSES[this.variant()];
  }
}
