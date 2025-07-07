import { EtherdocSdkConfig } from '../config/config';
export const getMoment = () => {
    const now = new Date();
    const iso = now.toISOString().replace(/[-:T.Z]/g, '');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return iso.slice(0, 17) + milliseconds;
};
export const getHeader = (token, user, application, k1) => {
    return {
        'Trace-Id': `${getMoment()}-${user}-${application}`,
        'Authorization': `Bearer ${token}`,
        // 'x-api-key': EtherdocSdkConfig.xApiKey,
        'k1': k1,
    };
};
export const buildHeaders = (token, user, application, k1) => {
    const headersObj = getHeader(token, user, application, k1);
    const headers = new Headers();
    Object.entries(headersObj).forEach(([key, value]) => {
        headers.append(key, value);
    });
    return headers;
};
export const buildUrl = (path, isDownload = false) => {
    const base = isDownload
        ? EtherdocSdkConfig.apiDownload
        : EtherdocSdkConfig.apiManagement;
    return `${base}${path}`;
};
