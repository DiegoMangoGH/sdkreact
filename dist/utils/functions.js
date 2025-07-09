import { EtherdocSdkConfig } from '../config/config';
export const getMoment = () => {
    try {
        const now = new Date();
        // Validación más completa de la fecha
        if (!(now instanceof Date) || isNaN(now.getTime())) {
            throw new Error('Invalid Date object');
        }
        // Componentes de fecha con validación individual
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    }
    catch (error) {
        console.error('Error in getMoment:', error);
        return Date.now().toString();
    }
};
export const getHeader = (token, user, application, k1) => {
    // Conversión segura a string con validación
    const safeToken = typeof token === 'string' ? token.trim() : '';
    const safeUser = typeof user === 'string' ? user.trim() : '';
    const safeApplication = typeof application === 'string' ? application.trim() : '';
    const safeK1 = typeof k1 === 'string' ? k1.trim() : '';
    // Validación explícita de parámetros requeridos
    if (!safeToken)
        throw new Error('Token is required');
    if (!safeUser)
        throw new Error('User is required');
    if (!safeApplication)
        throw new Error('Application is required');
    if (!safeK1)
        throw new Error('k1 is required');
    return {
        'Trace-Id': `${getMoment()}-${safeUser}-${safeApplication}`,
        'Authorization': `Bearer ${safeToken}`,
        'x-api-key': EtherdocSdkConfig.xApiKey,
        'k1': safeK1,
    };
};
export const buildHeaders = (token, user, application, k1) => {
    try {
        const headersObj = getHeader(token, user, application, k1);
        const headers = new Headers();
        for (const [key, value] of Object.entries(headersObj)) {
            if (typeof key !== 'string' || typeof value !== 'string') {
                throw new Error(`Invalid header type: ${typeof key}=${typeof value}`);
            }
            headers.append(key, value);
        }
        return headers;
    }
    catch (error) {
        console.error('Error building headers:', error);
        // Headers mínimos de fallback
        const fallback = new Headers();
        fallback.append('Trace-Id', getMoment());
        return fallback;
    }
};
export const buildUrl = (path, isDownload = false) => {
    var _a, _b;
    // Validación del parámetro path
    const safePath = typeof path === 'string' ? path.trim() : '';
    // Validación de configuración
    if (!EtherdocSdkConfig) {
        throw new Error('SDK configuration is missing');
    }
    const baseUrl = isDownload
        ? ((_a = EtherdocSdkConfig.apiDownload) === null || _a === void 0 ? void 0 : _a.trim()) || ''
        : ((_b = EtherdocSdkConfig.apiManagement) === null || _b === void 0 ? void 0 : _b.trim()) || '';
    if (!baseUrl) {
        throw new Error('Base URL is not configured');
    }
    // Construcción segura de la URL
    const normalizedBase = baseUrl.endsWith('/')
        ? baseUrl.slice(0, -1)
        : baseUrl;
    const normalizedPath = safePath.startsWith('/')
        ? safePath
        : `/${safePath}`;
    return `${normalizedBase}${normalizedPath}`;
};
