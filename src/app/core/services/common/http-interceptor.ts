import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  filter,
  finalize,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { TokenService } from './token.service';
import { ErrorHandlerService } from './error-handler.service';

// let requestCount = 0;
let isRefreshing = false;
const tokenSubject = new Subject<string>();

export const TokenInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authToken = inject(TokenService);
  const errorHanlder = inject(ErrorHandlerService);

  const handleFinalize = () => {
    // #region Handle set loading
    //   requestCount--;
    //   if (requestCount <= 0) {
    //     loadingService.setLoading(false);
    //   }
  };

  const newReq = req.clone({
    headers: req.headers.append(
      'Authorization',
      `Bearer ${authToken.getAccessToken()}`
    ),
  });
  return next(newReq).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 403) {
        return handleRefreshToken(err, req, next, authToken);
      }
      return errorHanlder.handleError(err);
    }),
    finalize(handleFinalize)
  );
};

const handleRefreshToken = (
  err: HttpErrorResponse,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  tokenService: TokenService
): Observable<HttpEvent<unknown>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    return tokenService.handleRefreshToken().pipe(
      take(1),
      map(res => {
        // handle set token
        return res;
      }),
      switchMap(res => next(addAuthorization(req, res.access_token))),
      catchError(() => {
        tokenService.logout();
        // requestCount = 0;
        return throwError(() => 'EXPIRED');
      })
    );
  } else {
    return tokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next(addAuthorization(req, jwt));
      })
    );
  }
};

function addAuthorization(
  httpRequest: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> {
  return httpRequest.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
