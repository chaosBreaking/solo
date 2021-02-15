import React from 'react';
import ReactDom from 'react-dom';
import Spinner from '@widgets/Spinner';

export default function showSpinner({ style, color, size, }) {
    const node = document.createElement('div');
    document.body.appendChild(node);
    ReactDom.render(<Spinner style={style} color={color} size={size} />, node);
};
