import { ApiResponse } from '../models/ApiResponse';
import { DocumentDetail } from '../models/Document';
export declare class EtherdocSdkServiceView {
    private k1;
    constructor(k1: string);
    getDocumentDetailsView(documentId: number, token: string, user: string, app: string): Promise<ApiResponse<DocumentDetail>>;
    getDocumentBlobView(documentId: string, token: string, user: string, application: string): Promise<Blob>;
}
