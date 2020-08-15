import React from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { RegistryCard, LoginCard } from '@widgets/AuthCards';
import { STAGE_MAP } from '../../constants';
import s from './index.scss';

export default withStyles(s)(inject('store')(observer(function NavigationBar ({ store }) {
    const handleLoginSubmit = async formData => {
        await store.loginHandler(formData);
    };
    const handleRegisterSubmit = async formData => {
        await store.registerHandler(formData);
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
