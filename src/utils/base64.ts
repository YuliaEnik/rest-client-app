export function convertToAnsii(base64: string) {
  try {
    return atob(decodeURIComponent(base64.replace('-_', '+/')));
  } catch {
    return base64;
  }
}

export function convertToBase64(data: string) {
  try {
    return btoa(data).replace('+/', '-_');
  } catch {
    return data;
  }
}
