import { DatePipe } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  imports: [DatePipe],
  selector: 'app-topbar',
  styleUrl: './topbar.css',
  templateUrl: './topbar.html',
})
export class Topbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly menuClick = output<void>();

  protected readonly username = computed(() => this.authService.currentUser()?.username ?? 'Usuario');
  protected readonly today = new Date();

  protected readonly isUserMenuOpen = signal(false);

  protected toggleUserMenu(): void {
    this.isUserMenuOpen.update((value) => !value);
  }

  protected closeUserMenu(): void {
    this.isUserMenuOpen.set(false);
  }

  protected logout(): void {
    this.authService.logout();
    this.closeUserMenu();
    this.router.navigate(['/auth/login']);
  }
}
