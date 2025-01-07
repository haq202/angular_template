import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  template: `<label
      [attr.for]="forId"
      [title]="title"
      class="title"
      [ngClass]="{
        'form-error': control.errors && (control.touched || control.dirty),
      }"
      >{{ title }}
    </label>
    <label class="markValidate" [attr.for]="forId">{{ markValidate }} </label>`,
  styleUrl: './label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() formGroup!: FormGroup;
  @Input() control!: FormControl;
  @Input() title = '';
  @Input() markValidate = '';
  @Input() forId = '';
}
