import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

const SLOGAN = ['Don&#39;t be afraid to dream', 'Just Solo!'];

@withStyles(s)
@inject('store')
@observer
export default class AuthCard extends Component {
    get store () {
        return this.props.store;
    }

    get showMask () {
        return this.store.stage !== 0;
    }

    changeStage (stage) {
        this.store.nextStage(stage);
    }

    loginBtnHandler = e => {
        e.stopPropagation();
    }

    registBtnHandler = e => {
        e.stopPropagation();
    }

    renderFirst () {
        return (
            <div className={s.main}>
                <div className={s.slogan}>
                    {SLOGAN.map(content => <span key={content}>{content}</span>)}
                </div>
                {/* <div className={s.btn} onClick={() => this.changeStage(1)}>登录</div>
                <div className={s.btn} onClick={() => this.changeStage(2)}>注册</div> */}
            </div>
        );
    }

    renderLogin () {
        return (
            <div className={s.login}>
                <input />
                <input />
                <div>
                    <div className={s.btn} onClick={this.loginBtnHandler}>登录</div>
                    <div className={s.btn} onClick={() => this.changeStage(0)}>返回</div>
                </div>
            </div>
        );
    }

    renderRegistration () {
        return (
            <div className={s.register}>
                <input />
                <input />
                <div>
                    <div className={s.btn} onClick={this.registBtnHandler}>注册</div>
                    <div className={s.btn} onClick={() => this.changeStage(0)}>返回</div>
                </div>
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
                {this.showMask && <div className={s.mask} />}
                {this.renderContent(stage)}
            </div>
        );
    }
}
