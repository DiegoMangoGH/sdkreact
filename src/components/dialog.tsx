import React, { useEffect, useState } from 'react';

const Dialog = ({ document, onClose }: { document: any; onClose: () => void }) => {
  const [validity, setValidity] = useState('');

  useEffect(() => {
    if (document?.documentExpirationDate && document?.creationDate) {
      const expiration = new Date(document.documentExpirationDate);
      const creation = new Date(document.creationDate);
      const years = expiration.getFullYear() - creation.getFullYear();
      const months = expiration.getMonth() - creation.getMonth();
      const totalMonths = years * 12 + months;
      setValidity(`${totalMonths} meses`);
    }
  }, [document]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE');
  };

  return (
    <div style={dialogStyles.overlay}>
      <div style={dialogStyles.container}>
        <div style={dialogStyles.header}>
          <strong>{document?.documentName}</strong>
        </div>
        <div style={dialogStyles.body}>
          <table style={dialogStyles.table}>
            <tbody>
              <tr><th>Categoría:</th><td>{document.categoryDescription3}</td></tr>
              <tr><th>Sub categoría:</th><td>{document.categoryDescription2}</td></tr>
              <tr><th>F. de registro:</th><td>{formatDate(document.creationDate)}</td></tr>
              <tr><th>F. de caducidad:</th><td>{formatDate(document.documentExpirationDate)}</td></tr>
              <tr><th>Vigencia:</th><td>{validity}</td></tr>
              <tr><th>Tamaño:</th><td>{document.size}</td></tr>
              <tr><th>Subido por:</th><td>{document.userRegister}</td></tr>
            </tbody>
          </table>
          <div style={dialogStyles.footer}>
            <button onClick={onClose} style={dialogStyles.closeButton}>CERRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog

const dialogStyles = {
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 300
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  },
  header: {
    marginBottom: 12,
    fontSize: 16,
    textAlign: 'center' as const
  },
  body: {
    fontSize: 14
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  footer: {
    marginTop: 16,
    textAlign: 'center' as const
  },
  closeButton: {
    padding: '6px 12px',
    fontSize: 14,
    borderRadius: 4,
    backgroundColor: '#2c2c2c',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};
