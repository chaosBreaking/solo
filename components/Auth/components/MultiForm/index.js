import React from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { RegistryCard, LoginCard } from '@widgets/AuthCards';
import { STAGE_MAP } from '../../constants';
import { toast } from 'react-toastify';
import { replacePage } from '@utils/navi';
import s from './index.scss';

export default withStyles(s)(inject('store')(observer(function NavigationBar({ store }) {
    const handleLoginSubmit = async formData => {
        const res = await store.loginHandler(formData);
        if (res.success) {
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
    const renderBody = () => {
        switch (store.currentStage) {
            case STAGE_MAP.LOGIN:
                return <LoginCard handleSubmit={handleLoginSubmit} backHandler={backHandler} />;
            case STAGE_MAP.SIGNUP:
                return <RegistryCard handleSubmit={handleRegisterSubmit} switchLogin={switchLogin} />;
        }
    };
    return renderBody();
})));
