var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { EtherdocSdkServiceView } from './../services/view.service';
import { viewStyles } from './../styles/view';
import Dialog from './dialog';
import { BackIcon } from '../icons/BackIcon';
import { DownloadIcon } from '../icons/DownloadIcon';
import { OptionIcon } from '../icons/OptionIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { MinusIcon } from '../icons/MinusIcon';
import { RotationIcon } from '../icons/RotationIcon';
GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
export const EtherdocSdkView = ({ documentId, token, user, application, openView, k1 }) => {
    var _a;
    const [blobUrl, setBlobUrl] = useState(null);
    const [documentDetail, setDocumentDetail] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const menuRef = useRef(null);
    const contentRef = useRef(null);
    const pageRefs = useRef([]);
    useEffect(() => {
        if (!openView || !documentId)
            return;
        const service = new EtherdocSdkServiceView(k1);
        const load = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setLoading(true);
                const [detail, blob] = yield Promise.all([
                    service.getDocumentDetailsView(Number(documentId), token, user, application),
                    service.getDocumentBlobView(documentId, token, user, application)
                ]);
                const url = URL.createObjectURL(blob);
                setDocumentDetail(detail.data);
                setBlobUrl(url);
                if (blob.type === 'application/pdf') {
                    setFileType('pdf');
                }
                else if (blob.type.startsWith('image/')) {
                    setFileType('image');
                }
                else {
                    console.error('Unsupported file type:', blob.type);
                    setFileType(null);
                }
            }
            catch (err) {
                console.error('Error loading document:', err);
            }
            finally {
                setLoading(false);
            }
        });
        load();
        return () => {
            if (blobUrl)
                URL.revokeObjectURL(blobUrl);
        };
    }, [documentId, token, user, application, openView, k1]);
    useEffect(() => {
        const content = contentRef.current;
        const targetPage = pageRefs.current[pageNumber - 1];
        if (content && targetPage) {
            const offsetTop = targetPage.offsetTop;
            content.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }, [pageNumber, numPages]);
    useEffect(() => {
        const content = contentRef.current;
        if (!content || fileType !== 'pdf' || numPages === 0)
            return;
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .map((e) => ({
                page: Number(e.target.getAttribute('data-page')),
                ratio: e.intersectionRatio
            }));
            if (visible.length > 0) {
                const mostVisible = visible.reduce((a, b) => (b.ratio > a.ratio ? b : a));
                if (mostVisible.page !== pageNumber)
                    setPageNumber(mostVisible.page);
            }
        }, {
            root: content,
            threshold: 0.5
        });
        pageRefs.current.forEach((ref) => {
            if (ref)
                observer.observe(ref);
        });
        return () => observer.disconnect();
    }, [numPages, pageNumber, fileType]);
    const handleDownload = () => {
        var _a;
        if (!blobUrl)
            return;
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = (_a = documentDetail === null || documentDetail === void 0 ? void 0 : documentDetail.documentName) !== null && _a !== void 0 ? _a : 'documento';
        a.click();
    };
    const handlePrint = () => {
        if (!blobUrl)
            return;
        const win = window.open(blobUrl);
        win === null || win === void 0 ? void 0 : win.print();
    };
    const handleShare = () => {
        alert('Función de compartir no implementada aún.');
    };
    const handleInfo = () => {
        setShowInfoModal(true);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    if (!openView)
        return null;
    return (React.createElement("div", { style: viewStyles.content, ref: contentRef },
        React.createElement("div", { style: viewStyles.topBar },
            React.createElement("button", { style: viewStyles.topBarButton },
                React.createElement(BackIcon, null)),
            React.createElement("div", { style: viewStyles.title }, (_a = documentDetail === null || documentDetail === void 0 ? void 0 : documentDetail.documentName) !== null && _a !== void 0 ? _a : 'Documento'),
            React.createElement("div", { style: { position: 'relative' }, ref: menuRef },
                React.createElement("button", { onClick: handleDownload, style: viewStyles.topBarButton },
                    React.createElement(DownloadIcon, null)),
                React.createElement("button", { onClick: () => setShowMenu(prev => !prev), style: Object.assign(Object.assign({}, viewStyles.topBarButton), { marginRight: 10 }) },
                    React.createElement(OptionIcon, null)),
                showMenu && (React.createElement("div", { style: viewStyles.optionsMenu },
                    React.createElement("button", { onClick: handleInfo, style: viewStyles.menuItem }, "Informaci\u00F3n"),
                    React.createElement("button", { onClick: handlePrint, style: viewStyles.menuItem }, "Imprimir"),
                    React.createElement("button", { onClick: handleShare, style: viewStyles.menuItem }, "Compartir"))))),
        loading && (React.createElement("div", { style: viewStyles.loadingOverlay },
            React.createElement("div", { style: viewStyles.spinner }))),
        !loading && fileType === 'pdf' && blobUrl && (React.createElement("div", { style: viewStyles.viewer },
            React.createElement(Document, { file: blobUrl, onLoadSuccess: ({ numPages }) => setNumPages(numPages) }, Array.from(new Array(numPages), (_, i) => (React.createElement("div", { key: `page_${i + 1}`, "data-page": i + 1, ref: (el) => { pageRefs.current[i] = el; }, style: { display: 'flex', justifyContent: 'center', margin: '16px 0' } },
                React.createElement(Page, { pageNumber: i + 1, scale: scale, rotate: rotation, renderAnnotationLayer: false, renderTextLayer: false }))))))),
        !loading && fileType === 'image' && blobUrl && (React.createElement("div", { style: Object.assign(Object.assign({}, viewStyles.viewer), { flexDirection: 'column' }) },
            React.createElement("img", { src: blobUrl, alt: "Imagen", style: { transform: `scale(${scale}) rotate(${rotation}deg)`, transition: 'transform 0.2s ease' } }))),
        !loading && (React.createElement("div", { style: viewStyles.controls },
            fileType === 'pdf' && (React.createElement(React.Fragment, null,
                React.createElement("span", null, "P\u00E1gina"),
                React.createElement("input", { type: "number", min: 1, max: numPages, value: pageNumber, onChange: (e) => {
                        const page = Number(e.target.value);
                        if (page >= 1 && page <= numPages)
                            setPageNumber(page);
                    }, style: viewStyles.pageInput }),
                React.createElement("span", { style: { margin: '0 10px' } },
                    "de ",
                    numPages),
                "\u00A0\u00A0|\u00A0\u00A0")),
            React.createElement("a", { style: viewStyles.buttonControls, onClick: () => setScale(s => Math.min(s + 0.1, 3)) },
                React.createElement(PlusIcon, null)),
            React.createElement("a", { style: viewStyles.buttonControls, onClick: () => setRotation(r => (r + 90) % 360) },
                React.createElement(RotationIcon, null)),
            React.createElement("a", { style: viewStyles.buttonControls, onClick: () => setScale(s => Math.max(s - 0.1, 0.5)) },
                React.createElement(MinusIcon, null)))),
        showInfoModal && documentDetail && (React.createElement(Dialog, { document: documentDetail, onClose: () => setShowInfoModal(false) }))));
};
