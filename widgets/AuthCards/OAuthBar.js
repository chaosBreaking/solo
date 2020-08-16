import React, { useState } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';
import { AUTH_TYPE } from './common';

export default withStyles(s)(observer(function OAuthBar (props) {
    const {
        authType,
        switchAuthType,
    } = props;

    return (
        <div className={s.oauth}>
            <div className={s.iconBtnWrapper}>
                <div className={cs(s.iconBtn, authType === AUTH_TYPE.EMAIL ? s.iconPhone : s.iconEmail)}
                    onClick={switchAuthType}
                />
            </div>
            <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGoogle)} /></div>
            <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGithub)} /></div>
            <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconFacebook)} /></div>
        </div>
    );
}));
