import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IColumnsDefinition } from '@core/models/table.model';
import { TableComponent } from '@components/common/table/table.component';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageValidatorComponent } from '@components/message-validator/message-validator.component';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [
    TableComponent,
    MainLayoutComponent,
    ReactiveFormsModule,
    MessageValidatorComponent,
    InputTextModule,
    TranslateModule,
    FormsModule,
    SelectButtonModule,
    ButtonModule,
  ],
  templateUrl: './demo-table.component.html',
  styleUrl: './demo-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoTableComponent extends AppComponentBase implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<unknown>;

  columns = signal<IColumnsDefinition[]>([]);
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

  fb = inject(FormBuilder);
  translateService = inject(TranslateService);

  formGroup!: FormGroup;
  isVi: boolean = false;
  languageOptions = signal<{ label: string; value: boolean }[]>([
    { label: 'English', value: false },
    { label: 'Tiếng Việt', value: true },
  ]);

  constructor() {
    super();
    this.initForm();
  }

  ngOnInit(): void {
    this.columns.set([
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
      {
        field: 'actions',
        header: 'Actions',
        minWidth: '50px',
        maxWidth: '100px',
        thColSpan: 1,
        tdColSpan: 1,
        customTemplate: this.actionTemplate,
      },
    ]);
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      language: [false],
    });
  }

  onEmitRecord(record: unknown): void {
    console.log('Record emitted:', record);
  }

  onSubmit(): void {
    console.log('Form submitted:', this.formGroup.value);
  }

  onChangeLang(event: MouseEvent) {
    this.isVi = !this.isVi;
    const lang = this.isVi ? 'vi' : 'en';
    this.translateService.use(lang);
  }

  onEdit(record: unknown, event: any): void {
    event?.stopPropagation();
    const index = this.data().findIndex(item => item === record);
    if (index !== -1) {
      const updatedData = [...this.data()];
      updatedData[index] = {
        ...(updatedData[index] as object),
        name: 'Updated Name',
      };
      this.data.set(updatedData);
      this.showSuccessMessage('Record updated successfully.');
    } else {
      this.showErrorMessage('Record not found.');
    }
  }

  onDelete(record: unknown, event?: any): void {
    event?.stopPropagation();
    const index = this.data().findIndex(item => item === record);
    if (index !== -1) {
      const updatedData = [...this.data()];
      updatedData.splice(index, 1);
      this.data.set(updatedData);
      this.selectedRows.set(
        this.selectedRows().filter(item => item !== record)
      );
    }
    this.showSuccessMessage('Record deleted successfully.');
  }

  get controls() {
    return this.formGroup.controls;
  }
}
