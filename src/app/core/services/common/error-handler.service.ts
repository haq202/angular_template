import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AppComponentBase } from '../../../shared/app-component-base';
import { HTTP_STATUS_ERROR_NAME } from '@core/constant/common.const';

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
        case HTTP_STATUS_ERROR_NAME.UNAUTHORIZED:
        case HTTP_STATUS_ERROR_NAME.INTERNAL_SERVER_ERROR:
          this.showErrorMessage(errorMsg || message || resultMsg);
          // remove token
          break;
        case HTTP_STATUS_ERROR_NAME.BAD_REQUEST: {
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
