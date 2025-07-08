import { EtherdocSdkConfig } from '../config/config';

export const getMoment = (): string => {
  try {
    const now = new Date();
    const isoString = now.toISOString();
    
    // Validación adicional más robusta
    if (typeof isoString !== 'string' || !isoString) {
      throw new Error('Invalid ISO string format');
    }
    
    // Asegurar que tenemos una string válida antes de usar replace
    const iso = String(isoString).replace(/[-:T.Z]/g, '');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    
    return iso.slice(0, 17) + milliseconds;
  } catch (error) {
    console.error('Error in getMoment:', error);
    // Valor de fallback más robusto
    return String(Date.now());
  }
};

export const getHeader = (
  token: string,
  user: string,
  application: string,
  k1: string
): Record<string, string> => {
  // Validar que todos los parámetros sean strings
  const safeToken = String(token || '');
  const safeUser = String(user || '');
  const safeApplication = String(application || '');
  const safeK1 = String(k1 || '');

  return {
    'Trace-Id': `${getMoment()}-${safeUser}-${safeApplication}`,
    'Authorization': `Bearer ${safeToken}`,
    // 'x-api-key': EtherdocSdkConfig.xApiKey,
    'k1': safeK1,
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
    // Asegurar que tanto key como value sean strings
    headers.append(String(key), String(value));
  });
  
  return headers;
};

export const buildUrl = (path: string, isDownload = false): string => {
  const base = isDownload
    ? EtherdocSdkConfig.apiDownload
    : EtherdocSdkConfig.apiManagement;
    
  // Validar que path sea una string
  const safePath = String(path || '');
  
  return `${base}${safePath}`;
};