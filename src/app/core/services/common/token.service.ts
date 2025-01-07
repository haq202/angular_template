import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '@core/constant/api.const';
import { IRefreshTokenResponse } from '@core/models/common.model';
import { environment } from '@environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private httpBackend: HttpBackend) {}

  getAccessToken() {
    // get token
    return null;
  }

  handleRefreshToken(): Observable<IRefreshTokenResponse> {
    const refreshToken = this.preFetchTokens();
    return new HttpClient(this.httpBackend)
      .post<IRefreshTokenResponse>(
        environment.apis.default.url + api.refreshToken,
        {
          refreshToken: refreshToken,
        }
      )
      .pipe(map((res: any) => res.data));
  }

  setToken() {
    // Handle set token
  }

  logout() {
    // Intentionally left empty for future implementation
  }

  preFetchTokens() {
    // Intentionally left empty for future implementation
  }
}
