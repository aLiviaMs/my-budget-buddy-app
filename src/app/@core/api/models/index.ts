export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export enum HttpHeaderType {
  JSON = 'json',
  MULTIPART_FORM_DATA = 'multipart/form-data',
}

export interface ApiResponse<T> {
  status: boolean;
  data: T;
  error?: string;
}

export interface ApiError {
  status: number;
  message: string;
}

// Exemplo de tipo de dados que você pode estar lidando
export interface UserData {
  id: string;
  name: string;
  email: string;
  // outros campos...
}
