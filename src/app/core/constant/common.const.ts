export const dateFormats = [
  'DD/MM/YYYY HH:mm',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
  'MM/DD/YYYY',
  'dddd, MMMM D, YYYY',
  // Add more if exist others format
];

export const DEFAULT_ITEM_PER_PAGE = 10;

export enum HTTP_STATUS_ERROR_NAME {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
  // Add more if needed
}

