import { EncodedParams, UrlParams } from '@/types/types';
import { convertToAnsii } from '@/utils/base64';
import { convertToBase64 } from '@/utils/base64';

export function parseUrl(url: string) {
  const [lang, method, ...params] = url.slice(1).split('/');
  const data: UrlParams = {
    lang,
    method: method.toUpperCase(),
    apiUrl: '',
    requestBody: '',
  };
  if (!params.length) return data;
  const parsedParams = parseParams(params);
  return Object.assign(data, parsedParams);
}

export function parseParams(params: string[]) {
  const data: EncodedParams = { apiUrl: '', requestBody: '' };
  if (!params.length) return data;
  const decodedParams = params.map((segment) => convertToAnsii(segment || ''));
  if (decodedParams[1]) data.requestBody = decodedParams[1];
  if (decodedParams[0].startsWith('http')) data.apiUrl = decodedParams[0];
  else data.requestBody = decodedParams[0];
  return data;
}

export function updateUrl({ method, apiUrl, requestBody }: Partial<UrlParams>) {
  const currentUrl = window.location.pathname;
  const searchParams = window.location.search;
  const parsedUrl = parseUrl(currentUrl);
  const url = [
    parsedUrl.lang,
    method || parsedUrl.method,
    convertToBase64(apiUrl !== undefined ? apiUrl : parsedUrl.apiUrl),
    convertToBase64(
      requestBody !== undefined ? requestBody : parsedUrl.requestBody
    ),
  ]
    .filter(Boolean)
    .join('/');
  return `/${url}${searchParams ? `${searchParams}` : ''}`;
}
