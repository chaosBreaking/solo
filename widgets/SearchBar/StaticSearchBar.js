import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import s from './static.scss';

export default function StaticSearchBar({ className, mountRef, onChange, onClick, placeholder, PreIcon }) {
    useStyles(s);
    const [content, setContent] = useState('');
    const events = { onChange, onClick };
    const onInputChange = e => {
        setContent(e.target.value);
        typeof onChange === 'function' && onChange(e.target.value);
    };
    const controller = {
        getContent() {
            return content;
        },
        setContent(content) {
            setContent(content);
        }
    };
    typeof mountRef === 'function' && mountRef(controller);
    return (
        <div className={cs(s.container, className)} {...events}>
            {!!PreIcon && <PreIcon />}
            <input onChange={onInputChange} value={content} placeholder={placeholder} />
        </div>
    );
};
