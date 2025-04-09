export interface IHttpApiResponse<R> {
  data: R;
  httpStatus: string;
  resultCode: number;
  resultMsg: string;
  correlationId: string;
  responseTimestamp: string;
}

export interface IRefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
  user_type: string;
  url_viags: string;
  is_duplicate: true;
}

export interface IPageRequestParams {
  page: number;
  pageSize: number;
}

export interface IExportFileCommon {
  fileName: string;
  pages?: IPageRequestParams;
  endpoint: string;
  [key: string]: unknown;
  downloadUrl?: string;
  mimeType?: string;
}

export interface IMenuItem {
  routerLink: string;
  icon: string;
  label: string;
  [key: string]: unknown;
  isActive?: boolean;
}
