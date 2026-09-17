import { Component, input } from '@angular/core';

export type TagVariant = 'success' | 'danger' | 'warning' | 'info';
export type TagSize = 'sm' | 'md';

const VARIANT_CLASSES: Record<TagVariant, string> = {
  success: 'bg-success-light text-success',
  danger: 'bg-danger-light text-danger',
  warning: 'bg-warning-light text-warning',
  info: 'bg-info-light text-info',
};

const SIZE_CLASSES: Record<TagSize, string> = {
  sm: 'rounded-sm px-2 py-0.5',
  md: 'rounded-sm px-3 py-1',
};

@Component({
  imports: [],
  selector: 'app-tag',
  styleUrl: './tag.css',
  templateUrl: './tag.html',
})
export class Tag {
  readonly variant = input<TagVariant>('info');
  readonly size = input<TagSize>('md');

  protected get classes(): string {
    return `${VARIANT_CLASSES[this.variant()]} ${SIZE_CLASSES[this.size()]}`;
  }
}
