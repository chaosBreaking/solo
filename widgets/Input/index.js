import React, { useState } from 'react';
import cs from 'classnames';

function Input (props) {
    const {
        classNames,
        type = 'text',
        placeholder,
        validateInput,
        getRef,
        lazyValidate = true, // 有过输入行为后才对输入校验
    } = props;
    const [input, updateInput] = useState('');
    const [inputedFlag, updateInputFlag] = useState(false);
    const [errorMsg, updateErrorMsg] = useState('');
    typeof getRef === 'function' && getRef(() => input);
    const updater = e => {
        e && e.stopPropagation();
        updateInput(e.target.value);
        updateErrorMsg('');
        !inputedFlag && updateInputFlag(true);
    };
    const validater = e => {
        e && e.stopPropagation();
        if (lazyValidate && !inputedFlag) return;
        if (typeof validateInput === 'function') {
            const { isValid, msg } = validateInput(input) || {};
            if (!isValid) {
                updateErrorMsg(msg);
            }
        }
    };
    const { normal, error, msg } = classNames;
    const containerClass = cs(normal, {
        [error]: !!errorMsg,
    });
    return (
        <div className={containerClass}>
            <input
                type={type}
                placeholder={placeholder}
                onBlur={validater}
                onChange={updater}
            />
            {!!errorMsg && <div className={msg}>{errorMsg}</div>}
        </div>
    );
};

export default Input;
