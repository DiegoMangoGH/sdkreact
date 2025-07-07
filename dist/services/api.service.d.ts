import { ApiResponse } from '../models/ApiResponse';
import { Category, Document, DocumentDetail, DocumentDownload } from '../models/Document';
export declare class EtherdocSdkService {
    private k1;
    constructor(k1: string);
    getCategoryList(folderTypeId: number, token: string, user: string, app: string): Promise<ApiResponse<Category[]>>;
    getDocumentList(body: any, token: string, user: string, app: string): Promise<ApiResponse<Document[]>>;
    getDocumentDetails(documentId: number, token: string, user: string, app: string): Promise<ApiResponse<DocumentDetail>>;
    downloadDocument(documentId: number, token: string, user: string, app: string): Promise<void>;
    deleteDocument(documentIds: number[], token: string, user: string, app: string): Promise<ApiResponse<number>>;
    updateDocument(body: any, token: string, user: string, app: string): Promise<ApiResponse<number>>;
    uploadDocument(documentRequest: any, token: string, user: string, app: string): Promise<ApiResponse<DocumentDownload>>;
}
