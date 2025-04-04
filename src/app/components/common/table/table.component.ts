import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  ViewChild,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import {
  bodyTableType,
  headerTableType,
  IColumnsDefinition,
} from '@core/models/table.model';
import { SortEvent } from 'primeng/api';
import {
  Table,
  TableHeaderCheckboxToggleEvent,
  TableModule,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
} from 'primeng/table';
import moment from 'moment';
import {
  dateFormats,
  DEFAULT_ITEM_PER_PAGE,
} from '@core/constant/common.const';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [TableModule, CommonModule, TooltipModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @ViewChild('dt') dt!: Table;
  /**
   * @description The columns definition for the table.
   * @type {IColumnsDefinition[]}
   * @example
   * const columns: IColumnsDefinition[] = [
   *  { field: 'name', header: 'Name', minWidth: '150px', maxWidth: '200px' },
   */
  columns = input<IColumnsDefinition[]>([]);

  /**
   * @description The data to be displayed in the table.
   * @type {unknown[]}
   */

  @Input() data: unknown[] = [];
  /**
   * @description The total number of records for pagination.
   * @type {number}
   */
  totalRecords = input<number>(0);

  /**
   * @description The number of records per page.
   * @type {number}
   */
  rows = input<number>(DEFAULT_ITEM_PER_PAGE);

  /**
   * @description The loading state of the table.
   * @type {number}
   */
  loading = input<boolean>(false);

  /**
   * @description The style class for the table.
   * @type {string}
   */
  styleClass = input<string>('p-datatable-striped');

  /**
   * @description Flag to indicate if the table is in edit mode.
   * @type {boolean}
   */
  isClickRecord = input<boolean>(false);

  /**
   * @description The height of the table.
   * @type {string}
   */
  scrollHeight = input<string>('');

  /**
   * @description The key used to identify each record in the table.
   * @type {string}
   */
  dataKey = input<string>('id');

  /**
   * @description The flag to indicate if the table should show order numbers.
   * @type {string}
   */
  isShowOrderNumber = input<boolean>(false);

  /**
   * @description The flag to indicate if the table should show a checkbox for selection.
   * @type {string}
   */
  isShowCheckbox = input<boolean>(false);

  /**
   * @description This is the selected rows in the table.
   * @type {unknown[]}
   */
  @Input() selectedRows: unknown[] = [];

  /**
   * @description The type of the table header.
   * @type {headerTableType}
   */
  headerTableType = input<headerTableType>('default');

  /**
   * @description The event emitter for when a record is clicked.
   * @type {unknown}
   */
  onEmitRecord = output<unknown>();

  onEmitSelectedRows = output<unknown[]>();

  /**
   * @description the flag to indicate if the table is sorted.
   * @type {boolean}
   */
  @Input() isSorted = signal<boolean | null>(null);

  /**
   * @description The name of the column used for order numbers.
   * @type {string}
   */
  colOrderNumberName = input<string>('No');

  /**
   * @description The current page of the table.
   * @type {number}
   */
  currentPage = signal<number>(0);

  /**
   * @description The custom header template for the table.
   * @type {TemplateRef<unknown>}
   */

  @ContentChild('customHeaderTable') customHeaderTable!: TemplateRef<unknown>;

  @ContentChild('customBodyTable') customBodyTable!: TemplateRef<unknown>;

  @ContentChild('footerTemplate') footerTemplate!: TemplateRef<unknown>;

  bodyTableType = input<bodyTableType>('default');

  initDataSources = signal<unknown[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes to input properties here
    console.log('Changes detected:', changes);
  }

  onClickRecord(rowData: unknown): void {
    this.isClickRecord() && this.onEmitRecord.emit(rowData);
  }

  onRowSelect(event: TableRowSelectEvent): void {
    console.log('__Select', event);
    this.handleEmitSelectedRows();
  }

  onRowUnselect(event: TableRowUnSelectEvent): void {
    console.log('__UnSelect', event);
    this.handleEmitSelectedRows();
  }

  onHeaderCheckboxToggle(event: TableHeaderCheckboxToggleEvent): void {
    console.log('__HeaderSelect', event);
    this.handleEmitSelectedRows();
  }

  private handleEmitSelectedRows() {
    this.onEmitSelectedRows.emit(this.selectedRows);
  }

  onSort(event: SortEvent): void {
    if (this.isSorted() == null || this.isSorted() === undefined) {
      this.isSorted.set(true);
      this.sortTableData(event);
    } else if (this.isSorted() == true) {
      this.isSorted.set(false);
      this.sortTableData(event);
    } else if (this.isSorted() == false) {
      this.isSorted.set(null);
      this.data = [...this.initDataSources()];
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    (event.data ?? []).sort(
      (data1: Record<string, unknown>, data2: Record<string, unknown>) => {
        let value1 = event.field ? (data1[event.field] ?? null) : null;
        let value2 = event.field ? (data2[event.field] ?? null) : null;
        let result = 0;

        const dateFormat = dateFormats;
        const isDate1 = moment(value1, dateFormat, true).isValid();
        const isDate2 = moment(value2, dateFormat, true).isValid();

        if (isDate1 && isDate2) {
          value1 = moment(value1, dateFormat, true).toDate();
          value2 = moment(value2, dateFormat, true).toDate();
        }

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else if (value1 !== null && value2 !== null) {
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        }

        return (event.order ?? 1) * result;
      }
    );
  }

  showColspan(): number {
    let colspan = this.columns?.length ?? 0;

    if (this.isShowOrderNumber()) {
      colspan += 1;
    }

    return colspan;
  }
}
