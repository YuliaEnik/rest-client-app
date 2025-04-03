import { RequestHeader } from '@/types/types';

export function parseHeaders(
  headers: Record<string, string | string[] | undefined>
): RequestHeader[] {
  if (Object.keys(headers).length) {
    return Object.keys(headers).reduce((acc, key) => {
      if (Array.isArray(headers[key])) {
        headers[key].forEach((value) =>
          acc.push({ isChecked: true, headerKey: key, headerValue: value })
        );
      } else {
        acc.push({
          isChecked: true,
          headerKey: decodeURIComponent(key),
          headerValue: decodeURIComponent(headers[key] || ''),
        });
      }
      return acc;
    }, [] as RequestHeader[]);
  }

  return [{ isChecked: true, headerKey: '', headerValue: '' }];
}

export function generateHeaders(headers: RequestHeader[]) {
  const preparedHeaders = headers
    .filter((header) => header.isChecked && header.headerKey)
    .map((header) => [
      encodeURIComponent(header.headerKey),
      encodeURIComponent(header.headerValue),
    ]);
  return new URLSearchParams(preparedHeaders);
}
