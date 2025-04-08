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
      minWidth: '50px',
      maxWidth: '100px',
      thColSpan: 1,
      tdColSpan: 2,
      maxLength: 80,
    },
    {
      field: 'age',
      header: 'Age',
      minWidth: '50px',
      maxWidth: '100px',
      thColSpan: 1,
      tdColSpan: 1,
    },
    {
      field: 'time',
      header: 'Time',
      minWidth: '50px',
      maxWidth: '100px',
      thColSpan: 1,
      tdColSpan: 1,
      dateFormat: 'dd/MM/yyyy HH:mm',
    },
  ]);
  data = signal<unknown[]>([
    {
      id: 1,
      name: 'substring() và slice() đều là các phương thức dùng để trích xuất chuỗi con (substring) từ một chuỗi trong JavaScript. Tuy nhiên, chúng có một số điểm khác biệt quan trọng, đặc biệt là cách xử lý chỉ số âm và thứ tự tham số.',
      age: 25,
      time: new Date(),
    },
    { id: 2, name: 'Jane Smith', age: 30, time: new Date() },
    { id: 3, name: 'Alice Johnson', age: 28, time: new Date() },
    { id: 4, name: 'Bob Brown', age: 35, time: new Date() },
    { id: 5, name: 'Charlie Davis', age: 22, time: new Date() },
    { id: 6, name: 'Eve Adams', age: 27, time: new Date() },
    { id: 7, name: 'Frank Miller', age: 32, time: new Date() },
    { id: 8, name: 'Grace Lee', age: 29, time: new Date() },
    { id: 9, name: 'Hank Wilson', age: 31, time: new Date() },
    { id: 10, name: 'Ivy Clark', age: 26, time: new Date() },
    { id: 11, name: 'Jack White', age: 33, time: new Date() },
    { id: 12, name: 'Kathy Green', age: 24, time: new Date() },
    { id: 13, name: 'Leo King', age: 36, time: new Date() },
    { id: 14, name: 'Mia Scott', age: 23, time: new Date() },
    { id: 15, name: 'Nina Young', age: 30, time: new Date() },
    { id: 16, name: 'Oscar Hall', age: 28, time: new Date() },
    { id: 17, name: 'Paul Allen', age: 34, time: new Date() },
    { id: 18, name: 'Quinn King', age: 25, time: new Date() },
    { id: 19, name: 'Rachel Adams', age: 29, time: new Date() },
    { id: 20, name: 'Steve Brown', age: 31, time: new Date() },
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

  onEmitRecord(record: unknown): void {
    console.log('Record emitted:', record);
  }
}
