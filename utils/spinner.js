import React from 'react';
import ReactDom from 'react-dom';
import Spinner from '@widgets/Spinner';

export default function showSpinner() {
    const node = document.createElement('div');
    document.body.appendChild(node);
    ReactDom.render(<Spinner />, node);
};
