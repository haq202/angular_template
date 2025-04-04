import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TableComponent } from './components/common/table/table.component';
import { IColumnsDefinition } from '@core/models/table.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LeftSidebarComponent,
    MainLayoutComponent,
    TableComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  columns = signal<IColumnsDefinition[]>([
    {
      field: 'name',
      header: 'Name',
      minWidth: '150px',
      maxWidth: '200px',
      thColSpan: 1,
      tdColSpan: 1,
    },
    {
      field: 'age',
      header: 'Age',
      minWidth: '50px',
      maxWidth: '100px',
      thColSpan: 1,
      tdColSpan: 1,
    },
  ]);
  data = signal<unknown[]>([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Alice Johnson', age: 28 },
    { id: 4, name: 'Bob Brown', age: 35 },
    { id: 5, name: 'Charlie Davis', age: 22 },
  ]);

  selectedRows = signal<unknown[]>([]);

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
