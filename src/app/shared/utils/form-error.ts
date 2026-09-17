import { AbstractControl } from '@angular/forms';

export function getControlError(
  control: AbstractControl | null,
  messages: Record<string, string>,
): string {
  if (!control || !control.touched || control.valid) return '';

  const errorKey = Object.keys(control.errors ?? {})[0];
  return errorKey ? (messages[errorKey] ?? '') : '';
}
