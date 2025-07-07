export const viewStyles = {
    content: {
        fontFamily: 'sans-serif',
        position: 'relative',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    topBar: {
        height: 'auto',
        backgroundColor: '#2c2c2c',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
    },
    topBarButton: {
        color: 'white',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '16px'
    },
    optionsMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: '#444',
        color: '#fff',
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        zIndex: 10
    },
    menuItem: {
        display: 'block',
        padding: '8px 12px',
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer'
    },
    viewer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: '16px 0'
    },
    controls: {
        position: 'sticky',
        bottom: 0,
        marginTop: 'auto',
        alignSelf: 'center',
        width: '350px',
        backgroundColor: '#2a2a2ada',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '12px',
        zIndex: 10,
        pointerEvents: 'auto'
    },
    buttonControls: {
        display: 'inline-block',
        paddingTop: 8,
        width: 38,
        height: 38,
        cursor: 'pointer',
        backgroundColor: 'none',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Atributo adicional
    },
    pageInput: {
        width: '38px',
        height: '30px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: '#33343688',
        border: 'none',
        color: '#e0dee5',
        borderRadius: '6px'
    },
    loadingOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99
    },
    spinner: {
        border: '4px solid #ccc',
        borderTop: '4px solid #2c2c2c',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
    },
};
export const modalStyles = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '90%',
        maxWidth: 400,
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: 16,
        cursor: 'pointer',
    },
    body: {
        fontSize: 14
    }
};
