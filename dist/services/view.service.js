var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buildHeaders } from './../utils/functions';
import { EtherdocSdkConfig } from '../config/config';
export class EtherdocSdkServiceView {
    constructor(k1) {
        this.k1 = k1;
    }
    getDocumentDetailsView(documentId, token, user, app) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${EtherdocSdkConfig.apiManagement}/view/detail?documentId=${documentId}`;
            const headers = buildHeaders(token, user, app, this.k1);
            const res = yield fetch(url, { headers });
            if (!res.ok)
                throw new Error(`Error fetching details: ${res.status}`);
            return yield res.json();
        });
    }
    getDocumentBlobView(documentId, token, user, application) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${EtherdocSdkConfig.apiDownload}/documentView?documentId=${documentId}`;
            const headers = buildHeaders(token, user, application, this.k1);
            const res = yield fetch(url, { headers });
            return yield res.blob();
        });
    }
}
