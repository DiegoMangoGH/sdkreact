import { buildUrl, buildHeaders } from './../utils/functions';
import { ApiResponse } from '../models/ApiResponse';
import {
    DocumentDetail,
    DocumentDownload
} from '../models/Document';
import { EtherdocSdkConfig } from '../config/config';

export class EtherdocSdkServiceView {
    private k1: string;

    constructor(k1: string) {
        this.k1 = k1;
    }

    async getDocumentDetailsView(
        documentId: number,
        token: string,
        user: string,
        app: string
    ): Promise<ApiResponse<DocumentDetail>> {
        const url = `${EtherdocSdkConfig.apiManagement}/view/detail?documentId=${documentId}`;
        const headers = buildHeaders(token, user, app, this.k1);
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`Error fetching details: ${res.status}`);
        return await res.json();
    }

    async getDocumentBlobView(documentId: string, token: string, user: string, application: string): Promise<Blob> {
        const url = `${EtherdocSdkConfig.apiDownload}/documentView?documentId=${documentId}`;
        const headers = buildHeaders(token, user, application, this.k1);
        const res = await fetch(url, { headers });
        return await res.blob();
    }
}
