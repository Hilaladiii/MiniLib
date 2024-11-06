export interface IResponseSuccess {
  statusCode: number;
  message: string;
  data: any;
}

export interface IResponseError {
  statusCode: number;
  message: string[] | string;
  error: string;
}
