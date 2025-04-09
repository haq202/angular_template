import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { IMenuItem } from '@core/models/common.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebarComponent {
  @Input({ required: true }) isLeftSidebarCollapsed = false;
  @Input({ required: true }) items: IMenuItem[] = [];
  changeIsLeftSidebarCollapsed = output<boolean>();

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
