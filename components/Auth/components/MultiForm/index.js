import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { RegistryCard, LoginCard } from '@widgets/AuthCards';
import { STAGE_MAP } from '../../constants';
import { toast } from 'react-toastify';
import { replaceQuery, replacePage } from '@utils/navi';
import s from './index.scss';
import useStores from '@framework/util';

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
            replacePage('/home.html');
        } else {
            toast.error(res.msg, {
                position: toast.POSITION.TOP_CENTER,
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
                return <LoginCard handleSubmit={handleLoginSubmit} backHandler={backHandler} />;
            case STAGE_MAP.SIGNUP:
                return <RegistryCard handleSubmit={handleRegisterSubmit} switchLogin={switchLogin} />;
        }
    };
    return renderBody();
});
