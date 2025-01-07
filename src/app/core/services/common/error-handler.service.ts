import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AppComponentBase } from '../../../shared/app-component-base';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends AppComponentBase {
  handleError(error: unknown) {
    if (!window.navigator.onLine) {
      this.showErrorMessage(
        'A connection error has occurred. Unable to retrieve data from the system. Please check your network connection or try again later.'
      );
      return throwError(() => error);
    }

    if (error instanceof HttpErrorResponse) {
      const { error: errorMsg, message, resultMsg } = error.error;

      switch (error.status) {
        case 401:
        case 500:
          this.showErrorMessage(errorMsg || message || resultMsg);
          // remove token
          break;
        case 400: {
          const errorData = error.error?.data;
          if (errorData && typeof errorData === 'object') {
            this.showErrorMessage(`${errorData[Object.keys(errorData)[0]]}`);
          }
          break;
        }
        default:
          this.showErrorMessage(resultMsg || message);
      }
    }

    return throwError(() => error);
  }
}
