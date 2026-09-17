import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type MenuIcon = 'dashboard' | 'clipboard' | 'apps' | 'monitor' | 'server' | 'store' | 'info';

interface MenuChild {
  label: string;
  route?: string;
}

interface MenuItem {
  label: string;
  icon: MenuIcon;
  route?: string;
  children?: MenuChild[];
}

@Component({
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
  host: {
    '[class]': 'hostClasses',
  },
})
export class Sidebar {
  readonly mobileOpen = input(false);
  readonly mobileClose = output<void>();

  protected readonly menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Productos', icon: 'clipboard' },
    { label: 'Apps', icon: 'apps' },
    {
      label: 'Páginas webs',
      icon: 'monitor',
      children: [
        { label: 'Administrador', route: '/paginas-webs/categorias' },
        { label: 'Recursos humanos' },
        { label: 'Estudios contables' },
        { label: 'Logística' },
      ],
    },
    { label: 'Servidores', icon: 'server' },
    { label: 'Tienda', icon: 'store' },
    { label: 'Centro de ayuda', icon: 'info' },
  ];

  protected readonly collapsed = signal(false);
  protected readonly expandedItem = signal<string | null>(null);

  protected toggleCollapse(): void {
    this.collapsed.update((value) => !value);
  }

  protected toggleExpand(label: string): void {
    this.expandedItem.update((current) => (current === label ? null : label));
  }

  protected get hostClasses(): string {
    const width = this.collapsed() ? 'lg:w-20' : 'lg:w-64';
    const translate = this.mobileOpen() ? 'translate-x-0' : '-translate-x-full';
    return `fixed inset-y-0 left-0 z-50 w-64 transition-all duration-200 lg:relative lg:z-auto lg:translate-x-0 ${width} ${translate}`;
  }
}
