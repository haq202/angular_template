import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-message-validator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-validator.component.html',
  styleUrl: './message-validator.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageValidatorComponent extends AppComponentBase {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) controlKey!: string;

  get message(): string | null {
    const ctrl = this.formGroup.get(this.controlKey);

    const errors: ValidationErrors | null = ctrl && ctrl.errors;
    if (!errors) {
      return null;
    }
    for (const key of Object.keys(errors)) {
      const errorMessage = this.validatorMessages?.[key];
      if (errorMessage) {
        return typeof errorMessage === 'function'
          ? errorMessage(errors[key])
          : errorMessage;
      }
    }

    return 'Giá trị không hợp lệ.';
  }
}
