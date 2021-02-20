import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { RegistryCard, LoginCard } from '@components/Common/AuthCards';
import { STAGE_MAP, PAGE_AFTER_LOGIN } from '../../constants';
import { toast } from 'react-toastify';
import { replaceQuery, replacePage } from '@utils/navi';
import useStores from '@framework/util';
import s from './index.scss';

export default observer(function NavigationBar() {
    useStyles(s);
    const { store } = useStores();
    React.useEffect(() => {
        const detain = window.addEventListener('popstate', () => {
            if (history.state.state) {
                store.switchStage(history.state.state);
            }
        });
        return () => window.removeEventListener('popstate', detain);
    });
    const handleLoginSubmit = async formData => {
        const res = await store.loginHandler(formData);
        if (res.success) {
            replacePage(PAGE_AFTER_LOGIN);
        } else {
            toast.error(res.msg, {
                position: toast.POSITION.TOP_LEFT,
                progressStyle: { display: 'none' }
            });
        }
    };
    const handleRegisterSubmit = async formData => {
        const res = await store.registerHandler(formData);
        if (res.success) {
            replacePage(PAGE_AFTER_LOGIN);
        } else {
            toast.error(res.msg, {
                position: toast.POSITION.TOP_LEFT,
                progressStyle: { display: 'none' }
            });
        }
    };
    const switchLogin = () => {
        history.pushState({ state: STAGE_MAP.SIGNUP }, '', `${location.origin}${location.pathname}?${replaceQuery({ state: STAGE_MAP.SIGNUP })}`);
        store.switchStage(STAGE_MAP.LOGIN);
    };
    const backHandler = () => {
        store.switchStage(STAGE_MAP.SIGNUP);
    };
    const renderBody = () => {
        switch (store.currentStage) {
            case STAGE_MAP.LOGIN:
                return <LoginCard handleSubmit={handleLoginSubmit} backHandler={backHandler} showRegister />;
            case STAGE_MAP.SIGNUP:
                return <RegistryCard handleSubmit={handleRegisterSubmit} switchLogin={switchLogin} />;
        }
    };
    return renderBody();
});
