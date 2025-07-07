export interface Document {
    documentId: number;
    folderId: number;
    documentName: string;
    documentType: string;
    categoryDescription1: string;
    categoryDescription2: string;
    categoryDescription3: string;
    comment: string;
    documentExpirationDate: string;
    userRegister: string;
    creationDate: string;
    metadata: string;
    totalRecords: number;
}
export interface DocumentResquest {
    entityType: string;
    entityId: number;
    startDate: string;
    endDate: string;
    categoryCode1: string;
    categoryCode2: string;
    categoryCode3: string;
    page: number;
    count: number;
}
export interface DocumentDetail {
    documentId: number;
    documentName: string;
    documentType: string;
    categoryDescription1: string;
    categoryDescription2: string;
    categoryDescription3: string;
    comment: string;
    size: string;
    documentExpirationDate: string;
    userRegister: string;
    userModified: string;
    creationDate: string;
    modificationDate: string;
    metadata: any;
}
export interface DocumentDownload {
    documentId: number;
    documentUrl: string;
    documentName: string;
}
export interface Category {
    id: number;
    code: string;
    description: string;
    period: string;
    idFather: string;
}
