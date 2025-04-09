import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { IMenuItem } from '@core/models/common.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [LeftSidebarComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  items = signal<IMenuItem[]>([
    {
      label: 'Table',
      icon: 'pi pi-table',
      routerLink: '/demo-table',
      isActive: false,
    },
    {
      label: 'Something',
      icon: 'pi pi-chevron-down',
      routerLink: '/',
      isActive: false,
    },
  ]);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
