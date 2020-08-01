import React, { useState } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';
import Card from '@widgets/Card';
import Button from '@widgets/Button';

export default withStyles(s)(observer(function LoginCard (props) {
    const {
        data,
        transparent,
    } = props;
    const [formState, updateFormData] = useState({
        loading: false,
        nickname: '',
        email: '',
        password: '',
        confirmPasswd: '',
    });
    const nicknameHandle = e => {
    };
    const emailInputHandle = e => {

    };
    const passwdInputHandler = e => {

    };
    const btnClickHandler = e => {
        e && e.stopPropagation();
        updateFormData({
            loading: true,
        });
    };
    const containerClass = cs(s.container, {
        [s.transparent]: transparent,
    });
    return (
        <Card className={containerClass}>
            <span>登录</span>
            <div onKeyUp={e => {
                e.keyCode === 13 && this.registBtnHandler(e);
            }} >
                <div className={s.inputBox}>
                    <input type="text" placeholder='邮箱地址' onChange={emailInputHandle} />
                    <input type="password" placeholder='密码' onChange={passwdInputHandler} />
                </div>
                <Button className={s.btn} text={'登录'} loading={formState.loading} onClick={btnClickHandler} />
                <Button text={'返回'} plain />
                <div className={s.oauthTip}>第三方登录</div>
                <div className={s.oauth}>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGoogle)} /></div>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGithub)} /></div>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconFacebook)} /></div>
                </div>
            </div>
        </Card>
    );
}));
