import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

@withStyles(s)
@inject('store')
@observer
export default class AuthCard extends Component {
    get store () {
        return this.props.store;
    }

    handleBtnClick (stage) {
        this.store.nextStage(stage);
    }

    renderFirst () {
        return (<div className={s.main}>
            <div className={s.slogan}>
                <span>Don&#39;t be afraid to dream</span>
                <span>Just Solo!</span>
            </div>
            <div className={s.btn} onClick={() => this.handleBtnClick(1)}>登录</div>
            <div className={s.btn} onClick={() => this.handleBtnClick(2)}>注册</div>
        </div>);
    }

    renderLogin () {
        return (
            <div className={s.login}>
                <input></input>
                <input></input>
                <div></div>
            </div>
        );
    }

    renderContent (stage) {
        switch (stage) {
        case 0: return this.renderFirst();
        case 1: return this.renderLogin();
        case 2: return this.renderRegistration();
        }
    }

    render () {
        const { stage } = this.store;
        return (
            <div className={s.container}>
                <div className={s.logo}><h1>Solo</h1></div>
                {this.renderContent(stage)}
            </div>
        );
    }
}
