import React from 'react';
import Loadable from 'react-loadable';

const LoadingUI = () => <div style={{ visibility: 'hidden' }} />;

const LoadableToast = Loadable({
    loader: () => import('./Toast'),
    loading: LoadingUI,
    delay: 200,
    timeout: 10000,
});

export default function ToastContainer(props) {
    return <LoadableToast {...props} />;
};
