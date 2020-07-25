import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import LoadingSVG from '@widgets/LoadingSVG';
import s from './index.scss';

function Button (props) {
    const { className, color, text, loading, disabled, wrapperStyles, innerStyles, plain, hollow, ...rest } = props;
    const isLoading = !disabled && loading;
    const containerClass = cs(s.container, className, {
        [s.loading]: isLoading,
        [s.disabled]: disabled,
        [s.hollow]: hollow,
        [s.plain]: plain,
    });
    return (
        <div className={containerClass} {...rest} disabled={disabled ? 'disabled' : ''} style={wrapperStyles}>
            <div className={s.bg} style={{ background: color, ...innerStyles }} />
            {isLoading ? <LoadingSVG /> : <span>{text}</span>}
        </div>
    );
};

export default withStyles(s)(Button);
