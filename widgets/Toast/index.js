import React from 'react';
import loadable from '@loadable/component';

const LoadableToast = loadable(() => import('./Toast'));

export default function ToastContainer(props) {
    return <LoadableToast {...props} />;
};
