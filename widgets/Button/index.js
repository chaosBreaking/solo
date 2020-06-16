import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';

function LoadingSVG () {
    return <svg version="1.1" id="loading" x="0px" y="0px" width=".22rem" height=".34rem" viewBox="0 0 24 30">
        <rect x="0" y="7.62827" width="4" height="14.7435" fill="#fff" opacity="0.4">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
        <rect x="8" y="9.87173" width="4" height="10.2565" fill="#fff" opacity="0.4">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
        <rect x="16" y="7.37173" width="4" height="15.2565" fill="#fff" opacity="0.4">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
    </svg>;
}

function Button (props) {
    const { color, text, loading, disabled, wrapperStyles, innerStyles, ...rest } = props;
    const isLoading = !disabled && loading;
    const containerClass = cs(s.container, {
        [s.loading]: isLoading,
        [s.disabled]: props.disabled,
        [s.hollow]: props.hollow,
        [s.plain]: props.plain,
    });
    return (
        <div className={containerClass} {...rest} disabled={disabled ? 'disabled' : ''} style={wrapperStyles}>
            <div className={s.bg} style={{ background: color, ...innerStyles }} />
            {isLoading ? <LoadingSVG /> : <span>{text}</span>}
        </div>
    );
};

export default withStyles(s)(Button);
export { LoadingSVG };
