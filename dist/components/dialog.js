import React, { useEffect, useState } from 'react';
const Dialog = ({ document, onClose }) => {
    const [validity, setValidity] = useState('');
    useEffect(() => {
        if ((document === null || document === void 0 ? void 0 : document.documentExpirationDate) && (document === null || document === void 0 ? void 0 : document.creationDate)) {
            const expiration = new Date(document.documentExpirationDate);
            const creation = new Date(document.creationDate);
            const years = expiration.getFullYear() - creation.getFullYear();
            const months = expiration.getMonth() - creation.getMonth();
            const totalMonths = years * 12 + months;
            setValidity(`${totalMonths} meses`);
        }
    }, [document]);
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-PE');
    };
    return (React.createElement("div", { style: dialogStyles.overlay },
        React.createElement("div", { style: dialogStyles.container },
            React.createElement("div", { style: dialogStyles.header },
                React.createElement("strong", null, document === null || document === void 0 ? void 0 : document.documentName)),
            React.createElement("div", { style: dialogStyles.body },
                React.createElement("table", { style: dialogStyles.table },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Categor\u00EDa:"),
                            React.createElement("td", null, document.categoryDescription3)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Sub categor\u00EDa:"),
                            React.createElement("td", null, document.categoryDescription2)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "F. de registro:"),
                            React.createElement("td", null, formatDate(document.creationDate))),
                        React.createElement("tr", null,
                            React.createElement("th", null, "F. de caducidad:"),
                            React.createElement("td", null, formatDate(document.documentExpirationDate))),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Vigencia:"),
                            React.createElement("td", null, validity)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Tama\u00F1o:"),
                            React.createElement("td", null, document.size)),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Subido por:"),
                            React.createElement("td", null, document.userRegister)))),
                React.createElement("div", { style: dialogStyles.footer },
                    React.createElement("button", { onClick: onClose, style: dialogStyles.closeButton }, "CERRAR"))))));
};
export default Dialog;
const dialogStyles = {
    overlay: {
        position: 'absolute',
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
        textAlign: 'center'
    },
    body: {
        fontSize: 14
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    footer: {
        marginTop: 16,
        textAlign: 'center'
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
