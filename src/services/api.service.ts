import { EtherdocSdkConfig } from '../config/config';
import { buildUrl, buildHeaders } from './../utils/functions';
import { ApiResponse } from '../models/ApiResponse';
import {
  Category,
  Document,
  DocumentDetail,
  DocumentDownload
} from '../models/Document';

export class EtherdocSdkService {
  constructor(private k1: string) {}


  async getCategoryList(folderTypeId: number, token: string, user: string, app: string): Promise<ApiResponse<Category[]>> {
    const url = buildUrl(`/category/list?folderTypeId=${folderTypeId}`);
    const headers = buildHeaders(token, user, app, this.k1);
    const res = await fetch(url, { headers });
    return await res.json();
  }

  async getDocumentList(body: any, token: string, user: string, app: string): Promise<ApiResponse<Document[]>> {
    const url = buildUrl('/document/list');
    const headers = buildHeaders(token, user, app, this.k1);
    headers.append('Content-Type', 'application/json');

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async getDocumentDetails(documentId: number, token: string, user: string, app: string): Promise<ApiResponse<DocumentDetail>> {
    const url = buildUrl(`/document/details?documentId=${documentId}`);
    const headers = buildHeaders(token, user, app, this.k1);
    const res = await fetch(url, { headers });
    return await res.json();
  }

  async downloadDocument(documentId: number, token: string, user: string, app: string): Promise<void> {
    const url = buildUrl(`/document?documentId=${documentId}`, true);
    const headers = buildHeaders(token, user, app, this.k1);

    const res = await fetch(url, { headers });
    const responseJson: ApiResponse<DocumentDownload> = await res.json();

    if (responseJson.isSuccess && responseJson.data) {
      const { documentUrl, documentName } = responseJson.data;
      const fileRes = await fetch(documentUrl);
      const blob = await fileRes.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = documentName;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      throw new Error(responseJson.message || 'Error downloading documents test');

    }
  }

  async deleteDocument(documentIds: number[], token: string, user: string, app: string): Promise<ApiResponse<number>> {
    const url = buildUrl('/document/delete');
    const headers = buildHeaders(token, user, app, this.k1);
    headers.append('Content-Type', 'application/json');

    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(documentIds),
    });
    return await res.json();
  }

  async updateDocument(body: any, token: string, user: string, app: string): Promise<ApiResponse<number>> {
    const url = buildUrl('/document/update');
    const headers = buildHeaders(token, user, app, this.k1);
    headers.append('Content-Type', 'application/json');

    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async uploadDocument(documentRequest: any, token: string, user: string, app: string): Promise<ApiResponse<DocumentDownload>> {
    const url = `${EtherdocSdkConfig.apiUpload}/document`;
    const headers = buildHeaders(token, user, app, this.k1);
    const formData = new FormData();

    formData.append('entityType', documentRequest.entityType);
    formData.append('entityId', documentRequest.entityId.toString());
    formData.append('categoryId', documentRequest.categoryId.toString());
    formData.append('documentName', documentRequest.documentName);
    formData.append('documentType', documentRequest.documentType);
    formData.append('comment', documentRequest.comment);
    formData.append('documentExpirationDate', documentRequest.documentExpirationDate);
    formData.append('userRegister', documentRequest.userRegister);
    formData.append('metadata', JSON.stringify(documentRequest.metadata));
    if (documentRequest.file) {
      formData.append('documentContent', documentRequest.file, documentRequest.documentName);
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    return await res.json();
  }
}
