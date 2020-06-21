import React, { useState, useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import s from './index.scss';

function SearchBar (props) {
    const [content, setContent] = useState('');
    const { mountRef, onChange, onClick, onConfirm } = props;
    const events = { onChange, onClick };
    const onInputChange = e => {
        setContent(e.target.value);
        typeof onChange === 'function' && onChange(e.target.value);
    };
    const controller = {
        getContent () {
            return content;
        },
        setContent (content) {
            setContent(content);
        }
    };
    typeof mountRef === 'function' && mountRef(controller);
    return (
        <div className={s.container} {...events}>
            <input onChange={onInputChange} value={content} placeholder="搜索或者跳转到..." id="topBarInput" />
        </div>
    );
};

export default withStyles(s)(SearchBar);
