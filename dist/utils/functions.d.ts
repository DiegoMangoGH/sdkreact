export declare const getMoment: () => string;
export declare const getHeader: (token: string, user: string, application: string, k1: string) => Record<string, string>;
export declare const buildHeaders: (token: string, user: string, application: string, k1: string) => Headers;
export declare const buildUrl: (path: string, isDownload?: boolean) => string;
