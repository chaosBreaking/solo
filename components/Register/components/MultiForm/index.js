import React from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { RegistryCard, LoginCard } from '@widgets/AuthCards';
import { STAGE_MAP } from '../../constants';
import { toast } from 'react-toastify';
import { forward, replacePage } from '@utils/navi';
import s from './index.scss';

export default withStyles(s)(inject('store')(observer(function NavigationBar ({ store }) {
    const handleLoginSubmit = async formData => {
        const res = await store.loginHandler(formData);
        if (res.success) {
            console.info(res);
            replacePage('/home.html');
        } else {
            toast.error(res.msg, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };
    const handleRegisterSubmit = async formData => {
        const res = await store.registerHandler(formData);
        if (res.success) {
            toast.info('注册成功，即将开启Solo之旅...', {
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
                replacePage('/home.html');
            });
        } else {
            toast.error(res.msg, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };
    const switchLogin = () => {
        store.switchStage(STAGE_MAP.LOGIN);
    };
    const backHandler = () => {
        store.switchStage(STAGE_MAP.SIGNUP);
    };
    switch (store.currentStage) {
    case STAGE_MAP.LOGIN:
        return (
            <div className={s.container}>
                <LoginCard handleSubmit={handleLoginSubmit} backHandler={backHandler} />
            </div>
        );
    case STAGE_MAP.SIGNUP:
        return (
            <div className={s.container}>
                <RegistryCard handleSubmit={handleRegisterSubmit} switchLogin={switchLogin} />
            </div>
        );
    }
})));