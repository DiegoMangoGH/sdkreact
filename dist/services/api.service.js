var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EtherdocSdkConfig } from '../config/config';
import { buildUrl, buildHeaders } from './../utils/functions';
export class EtherdocSdkService {
    constructor(k1) {
        this.k1 = k1;
    }
    getCategoryList(folderTypeId, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = buildUrl(`/category/list?folderTypeId=${folderTypeId}`);
            const headers = buildHeaders(token, user, app, this.k1);
            const res = yield fetch(url, { headers });
            return yield res.json();
        });
    }
    getDocumentList(body, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = buildUrl('/document/list');
            const headers = buildHeaders(token, user, app, this.k1);
            headers.append('Content-Type', 'application/json');
            const res = yield fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });
            return yield res.json();
        });
    }
    getDocumentDetails(documentId, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = buildUrl(`/document/details?documentId=${documentId}`);
            const headers = buildHeaders(token, user, app, this.k1);
            const res = yield fetch(url, { headers });
            return yield res.json();
        });
    }
    downloadDocument(documentId, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = buildUrl(`/document?documentId=${documentId}`, true);
            const headers = buildHeaders(token, user, app, this.k1);
            const res = yield fetch(url, { headers });
            const responseJson = yield res.json();
            if (responseJson.isSuccess && responseJson.data) {
                const { documentUrl, documentName } = responseJson.data;
                const fileRes = yield fetch(documentUrl);
                const blob = yield fileRes.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = documentName;
                link.click();
                URL.revokeObjectURL(link.href);
            }
            else {
                throw new Error(responseJson.message || 'Error downloading documents test');
            }
        });
    }
    deleteDocument(documentIds, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = buildUrl('/document/delete');
            const headers = buildHeaders(token, user, app, this.k1);
            headers.append('Content-Type', 'application/json');
            const res = yield fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(documentIds),
            });
            return yield res.json();
        });
    }
    updateDocument(body, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = buildUrl('/document/update');
            const headers = buildHeaders(token, user, app, this.k1);
            headers.append('Content-Type', 'application/json');
            const res = yield fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body),
            });
            return yield res.json();
        });
    }
    uploadDocument(documentRequest, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const res = yield fetch(url, {
                method: 'POST',
                headers,
                body: formData,
            });
            return yield res.json();
        });
    }
}
