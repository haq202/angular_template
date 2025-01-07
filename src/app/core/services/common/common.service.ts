import { Injectable } from '@angular/core';
import { HttpApiService } from '../http/http-api.service';
import { HttpClient } from '@angular/common/http';
import { IExportFileCommon } from '@core/models/common.model';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private readonly httpApi: HttpApiService,
    private readonly httpClient: HttpClient
  ) {}

  handleExportFile(params: IExportFileCommon, body: unknown = {}) {
    let endpoint = this.httpApi.handleParseUrl(null, params.endpoint, params);
    if (params.downloadUrl) {
      endpoint = params.downloadUrl;
    }

    return this.httpClient
      .post(endpoint, body, { responseType: 'blob' })
      .pipe(
        take(1),
        map((result: unknown) => ({
          fileName: params.fileName,
          data: new Blob([result as BlobPart], {
            type: params.mimeType || 'application/xlsx',
          }),
        }))
      )
      .subscribe({
        next: res => {
          const url = window.URL.createObjectURL(res.data);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = res.fileName;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        },
      });
  }
}
