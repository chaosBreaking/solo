import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';

function LoadingSVG () {
    return <svg version="1.1" id="loading" x="0px" y="0px" width=".22rem" height=".34rem" viewBox="0 0 24 30">
        <rect x="0" y="7.62827" width="4" height="14.7435" fill="#fff" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
        <rect x="8" y="9.87173" width="4" height="10.2565" fill="#fff" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
        <rect x="16" y="7.37173" width="4" height="15.2565" fill="#fff" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
        </rect>
    </svg>;
}

function Button (props) {
    const [state, setState] = useState(props);
    const isLoading = !state.disabled && state.loading;
    const className = cs(s.btn, {
        [s.loading]: isLoading,
        [s.disabled]: state.disabled,
        [s.hollow]: props.hollow
    });
    return (
        <div className={className} {...props}>
            {isLoading ? LoadingSVG : state.text}
        </div>
    );
};

export default withStyles(s)(Button);
export { LoadingSVG };
