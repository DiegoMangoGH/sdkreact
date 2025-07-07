import React, { useEffect, useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { EtherdocSdkServiceView } from './../services/view.service';
import { DocumentDetail } from '../models/Document';
import { viewStyles, modalStyles } from './../styles/view';
import  Dialog  from './dialog';

import { BackIcon } from '../icons/BackIcon';
import { DownloadIcon } from '../icons/DownloadIcon';
import { OptionIcon } from '../icons/OptionIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { MinusIcon } from '../icons/MinusIcon';
import { RotationIcon } from '../icons/RotationIcon';

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

type Props = {
  documentId: string;
  token: string;
  user: string;
  application: string;
  openView: boolean;
  k1: string;
};

export const EtherdocSdkView: React.FC<Props> = ({
  documentId,
  token,
  user,
  application,
  openView,
  k1
}) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [documentDetail, setDocumentDetail] = useState<DocumentDetail | null>(null);
  const [fileType, setFileType] = useState<'pdf' | 'image' | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!openView || !documentId) return;

    const service = new EtherdocSdkServiceView(k1);

    const load = async () => {
      try {
        setLoading(true);
        const [detail, blob] = await Promise.all([
          service.getDocumentDetailsView(Number(documentId), token, user, application),
          service.getDocumentBlobView(documentId, token, user, application)
        ]);

        const url = URL.createObjectURL(blob);
        setDocumentDetail(detail.data);
        setBlobUrl(url);

        if (blob.type === 'application/pdf') {
          setFileType('pdf');
        } else if (blob.type.startsWith('image/')) {
          setFileType('image');
        } else {
          console.error('Unsupported file type:', blob.type);
          setFileType(null);
        }
      } catch (err) {
        console.error('Error loading document:', err);
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
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
    if (!content || fileType !== 'pdf' || numPages === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .map((e) => ({
          page: Number(e.target.getAttribute('data-page')),
          ratio: e.intersectionRatio
        }));

      if (visible.length > 0) {
        const mostVisible = visible.reduce((a, b) => (b.ratio > a.ratio ? b : a));
        if (mostVisible.page !== pageNumber) setPageNumber(mostVisible.page);
      }
    }, {
      root: content,
      threshold: 0.5
    });

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages, pageNumber, fileType]);

  const handleDownload = () => {
    if (!blobUrl) return;
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = documentDetail?.documentName ?? 'documento';
    a.click();
  };

  const handlePrint = () => {
    if (!blobUrl) return;
    const win = window.open(blobUrl);
    win?.print();
  };


  const handleShare = () => {
    alert('Función de compartir no implementada aún.');
  };

  const handleInfo = () => {
    setShowInfoModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!openView) return null;

  return (
    <div style={viewStyles.content} ref={contentRef}>
      {/* Top Bar */}
      <div style={viewStyles.topBar}>
        <button style={viewStyles.topBarButton}><BackIcon /></button>
        <div style={viewStyles.title}>{documentDetail?.documentName ?? 'Documento'}</div>
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button onClick={handleDownload} style={viewStyles.topBarButton}><DownloadIcon /></button>
          <button onClick={() => setShowMenu(prev => !prev)} style={{ ...viewStyles.topBarButton, marginRight: 10 }}>
            <OptionIcon />
          </button>
          {showMenu && (
            <div style={viewStyles.optionsMenu}>
              <button onClick={handleInfo} style={viewStyles.menuItem}>Información</button>
              <button onClick={handlePrint} style={viewStyles.menuItem}>Imprimir</button>
              <button onClick={handleShare} style={viewStyles.menuItem}>Compartir</button>
            </div>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={viewStyles.loadingOverlay}>
          <div style={viewStyles.spinner}></div>
        </div>
      )}

      {/* PDF Viewer */}
      {!loading && fileType === 'pdf' && blobUrl && (
        <div style={viewStyles.viewer}>
          <Document
            file={blobUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (_, i) => (
              <div
                key={`page_${i + 1}`}
                data-page={i + 1}
                ref={(el) => { pageRefs.current[i] = el; }}
                style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}
              >
                <Page
                  pageNumber={i + 1}
                  scale={scale}
                  rotate={rotation}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      )}

      {/* Image Viewer */}
      {!loading && fileType === 'image' && blobUrl && (
        <div style={{ ...viewStyles.viewer, flexDirection: 'column' }}>
          <img
            src={blobUrl}
            alt="Imagen"
            style={{ transform: `scale(${scale}) rotate(${rotation}deg)`, transition: 'transform 0.2s ease' }}
          />
        </div>
      )}

      {/* Controls */}
      {!loading && (
        <div style={viewStyles.controls}>
          {fileType === 'pdf' && (
            <>
              <span>Página</span>
              <input
                type="number"
                min={1}
                max={numPages}
                value={pageNumber}
                onChange={(e) => {
                  const page = Number(e.target.value);
                  if (page >= 1 && page <= numPages) setPageNumber(page);
                }}
                style={viewStyles.pageInput}
              />
              <span style={{ margin: '0 10px' }}>de {numPages}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </>
          )}
          <a style={viewStyles.buttonControls} onClick={() => setScale(s => Math.min(s + 0.1, 3))}><PlusIcon /></a>
          <a style={viewStyles.buttonControls} onClick={() => setRotation(r => (r + 90) % 360)}><RotationIcon /></a>
          <a style={viewStyles.buttonControls} onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}><MinusIcon /></a>
        </div>
      )}
      {showInfoModal && documentDetail && (
        <Dialog document={documentDetail} onClose={() => setShowInfoModal(false)} />
      )}

    </div>
  );
};
