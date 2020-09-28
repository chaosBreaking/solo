import React, { useState, useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './flex.scss';

export default function SearchBar(props) {
    useStyles(s);
    const [content, setContent] = useState('');
    const { mountRef, onChange, onClick, placeholder = '搜索或者跳转到...' } = props;
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
        <div className={s.container} {...events}>
            <input onChange={onInputChange} value={content} placeholder={placeholder} id="topBarInput" />
        </div>
    );
};
