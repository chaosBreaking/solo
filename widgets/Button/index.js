import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import LoadingSVG from '@widgets/LoadingSVG';
import s from './index.scss';

function Button(props) {
    useStyles(s);
    const { className, color, text, loading, disabled, wrapperStyles, innerStyles, plain, hollow, ...rest } = props;
    const isLoading = !disabled && loading;
    const containerClass = cs(s.container, className, {
        [s.loading]: isLoading,
        [s.disabled]: disabled,
        [s.hollow]: hollow,
        [s.plain]: plain,
    });
    return (
        <div className={containerClass} {...rest} style={wrapperStyles}>
            {/* <div className={s.bg} style={{ background: color, ...innerStyles }} /> */}
            <div className={s.content}>
                {isLoading ? <LoadingSVG /> : text}
            </div>
        </div>
    );
};

export default Button;
