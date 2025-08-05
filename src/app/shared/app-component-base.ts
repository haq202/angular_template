import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export abstract class AppComponentBase {
  private readonly messageService = inject(MessageService);

  private showMessage(severity: 'success' | 'info' | 'warn' | 'error', summary: string = '', message: string = '') {
    this.messageService.clear('tms');
    this.messageService.add({
      key: 'tms',
      severity,
      summary,
      detail: message,
    });
  }

  showSuccessMessage(message = '') {
    this.showMessage('success', 'Success', message);
  }

  showInfoMessage(message: string) {
    this.showMessage('info', 'Information', message);
  }

  showWarningMessage(message: string) {
    this.showMessage('warn', 'Warning', message);
  }

  showErrorMessage(message: string) {
    this.showMessage('error', 'Error', message);
  }

  validatorMessages: Record<string, (error: any) => string> = {
    required: () => 'Trường này là bắt buộc.',
    minlength: (error: { requiredLength: number }) => `Trường này phải có ít nhất ${error.requiredLength} ký tự.`,
    maxlength: (error: { requiredLength: number }) => `Trường này không được vượt quá ${error.requiredLength} ký tự.`,
    email: () => 'Địa chỉ email không hợp lệ.',
    pattern: (error: { requiredPattern: string }) => `Giá trị không khớp với mẫu: ${error.requiredPattern}.`,
    min: (error: { min: number }) => `Giá trị phải lớn hơn hoặc bằng ${error.min}.`,
    max: (error: { max: number }) => `Giá trị phải nhỏ hơn hoặc bằng ${error.max}.`,
    custom: (error: { message: string }) => error.message || 'Giá trị không hợp lệ.',
  };
}
