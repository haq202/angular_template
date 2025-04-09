import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IColumnsDefinition } from '@core/models/table.model';
import { TableComponent } from '@components/common/table/table.component';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';

@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [TableComponent, MainLayoutComponent],
  templateUrl: './demo-table.component.html',
  styleUrl: './demo-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoTableComponent {
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
  ]);

  selectedRows = signal<unknown[]>([]);

  onEmitRecord(record: unknown): void {
    console.log('Record emitted:', record);
  }
}
