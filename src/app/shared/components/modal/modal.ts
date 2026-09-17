import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-modal',
  styleUrl: './modal.css',
  templateUrl: './modal.html',
})
export class Modal {
  readonly open = input(false);
  readonly title = input('');
  readonly closed = output<void>();

  protected onBackdropClick(): void {
    this.closed.emit();
  }

  protected onCloseClick(): void {
    this.closed.emit();
  }
}
