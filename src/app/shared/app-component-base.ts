import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export abstract class AppComponentBase {
  messageService = inject(MessageService);

  private showMessage(severity: string, summary: string, message: string) {
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
}
