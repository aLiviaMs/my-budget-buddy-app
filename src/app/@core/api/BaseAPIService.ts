// apiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../../../../enviroment';
import { ApiError, ApiResponse, HttpHeaderType, HttpMethod } from './models';

// TODO: create storage service
// TODO: create specs
const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(environment.tokenKey);
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};

const setHeaders = async (mode: HttpHeaderType, xTokenCode?: string): Promise<Record<string, string>> => {
  const bearerToken = await getToken();

  let headers: Record<string, string> = {
    'x-application-id': environment.applicationId,
    'x-application-key': environment.applicationKey,
    ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
    ...(xTokenCode && { 'x-token': xTokenCode }),
  };

  if (mode === HttpHeaderType.JSON) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

export const apiCall = async <T>(
  method: HttpMethod,
  path: string,
  body: Record<string, any> = {},
  mode: HttpHeaderType = HttpHeaderType.JSON,
  xTokenCode?: string
): Promise<ApiResponse<T>> => {
  const url = `${environment.api}/${path}`;
  const headers = await setHeaders(mode, xTokenCode);

  const config: AxiosRequestConfig = {
    method,
    url,
    data: body,
    headers,
  };

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios(config);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error as AxiosResponse<ApiError>);
  }
};

const handleSuccess = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
  const { data } = response;
  if (!data.status) {
    throw new Error(data.error || 'Erro desconhecido');
  }
  return data;
};

const handleError = (error: AxiosResponse<ApiError>): never => {
  const errorMessage = error.data?.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
  console.error('Erro na API:', errorMessage);
  throw new Error(errorMessage);
};
