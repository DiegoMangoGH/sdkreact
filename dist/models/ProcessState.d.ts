import { ApiResponse } from "./ApiResponse";
import { Document, DocumentDetail, DocumentDownload, Category } from "./Document";
export interface ProcessState {
    categories: ApiResponse<Category[]> | null;
    documents: ApiResponse<Document[]> | null;
    documentDetails: ApiResponse<DocumentDetail> | null;
    downloadInfo: DocumentDownload | null;
    error: any;
}
