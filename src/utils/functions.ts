import { EtherdocSdkConfig } from '../config/config';

export const getMoment = (): string => {
  try {
    const now = new Date();
    const isoString = now.toISOString();
    // Validación adicional
    if (typeof isoString !== 'string') {
      throw new Error('Invalid ISO string format');
    }
    const iso = isoString.replace(/[-:T.Z]/g, '');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return iso.slice(0, 17) + milliseconds;
  } catch (error) {
    console.error('Error in getMoment:', error);
    // Valor de fallback
    return `${Date.now()}`;
  }
};

export const getHeader = (
  token: string,
  user: string,
  application: string,
  k1: string
): Record<string, string> => {
  return {
    'Trace-Id': `${getMoment()}-${user}-${application}`,
    'Authorization': `Bearer ${token}`,
    // 'x-api-key': EtherdocSdkConfig.xApiKey,
    'k1': k1,
  };
};

export const buildHeaders = (
  token: string,
  user: string,
  application: string,
  k1: string
): Headers => {
  const headersObj = getHeader(token, user, application, k1);
  const headers = new Headers();
  Object.entries(headersObj).forEach(([key, value]) => {
    headers.append(key, value);
  });
  return headers;
};

export const buildUrl = (path: string, isDownload = false): string => {
  const base = isDownload
    ? EtherdocSdkConfig.apiDownload
    : EtherdocSdkConfig.apiManagement;
  return `${base}${path}`;
};
