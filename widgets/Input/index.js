import React, { useState } from 'react';
import cs from 'classnames';

function Input (props) {
    const { classNames, type, placeholder, errorMsg, validateInput, getRef, } = props;
    const [input, updateInput] = useState('');
    const [showError, updateError] = useState(false);
    typeof getRef === 'function' && getRef(() => input);
    const updater = e => {
        e && e.stopPropagation();
        e.target.value && updateInput(e.target.value);
        updateError(false);
    };
    const validater = e => {
        e && e.stopPropagation();
        if (typeof validateInput === 'function') {
            const isValid = validateInput(input);
            if (!isValid) {
                updateError(true);
            }
        }
    };
    const { normal, error, msg } = classNames;
    const containerClass = cs(normal, {
        [error]: showError,
    });
    return (
        <div className={containerClass}>
            <input
                type={type}
                placeholder={placeholder}
                onBlur={validater}
                onChange={updater}
            />
            {showError && <div className={msg}>{errorMsg}</div>}
        </div>
    );
};

export default Input;
