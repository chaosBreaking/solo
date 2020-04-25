import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { STAGE_MAP, AUTH_TYPE } from '../../constants';
import cs from 'classnames';
import s from './index.scss';

const SLOGAN = ['Don\'t be afraid to dream', 'Just Solo!'];

@withStyles(s)
@inject('store')
@observer
export default class AuthCard extends Component {
    get store () {
        return this.props.store;
    }

    get stage () {
        return +this.props.store.stage;
    }

    get showMask () {
        return this.stage !== 0;
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

    changeAuthType = type => {
        this.store.changeAuthType(type);
    }

    onNextStepClick = async e => {
        e.stopPropagation();
        if (this.stage === 1) {
            const nextStage = await this.store.preAuth();
            this.store.nextStage(nextStage);
        }
    }

    renderFirst () {
        return (
            <div className={s.main}>
                <div className={s.slogan}>
                    {SLOGAN.map(content => <span key={content}>{content}</span>)}
                </div>
                <div className={s.btn} onClick={() => this.changeStage(STAGE_MAP.PRE_AUTH)}>开始吧</div>
            </div>
        );
    }

    renderPreAuth () {
        const btnText = this.stage === STAGE_MAP.PRE_AUTH ? '下一步' : '登录';
        return (
            <div className={s.login} onKeyUp={e => {
                e.keyCode === 13 && this.onNextStepClick(e);
            }}>
                <div className={s.info}>
                    <p>多说无益，在这里汇聚灵感</p>
                    <p>Just solo</p>
                </div>
                {
                    this.stage === STAGE_MAP.PRE_AUTH
                        ? <input key={'userName'} placeholder='用户名' />
                        : <input className={s.passwdInput} key={'passwd'} placeholder='密钥' />
                }
                {
                    <div className={s.oauth}>
                        <div className={cs(s.iconBtn, s.iconGoogle)} />
                        <div className={cs(s.iconBtn, s.iconGithub)} />
                        <div className={cs(s.iconBtn, s.iconFacebook)} />
                    </div>
                }
                <div>
                    <div className={s.btn} onClick={this.onNextStepClick}>{btnText}</div>
                    <div className={cs(s.btn, s.noBackground)} onClick={() => this.changeStage(STAGE_MAP.START)}>返回</div>
                </div>
            </div>
        );
    }

    renderRegistration () {
        const authType = this.store.authType;
        const placeholder = authType === AUTH_TYPE.EMAIL ? '邮箱' : '手机号';
        const emailClass = cs(s.iconBtn, s.iconEmail, {
            [s.choosed]: authType === AUTH_TYPE.EMAIL
        });
        const phoneClass = cs(s.iconBtn, s.iconPhone, {
            [s.choosed]: authType === AUTH_TYPE.PHONE
        });
        return (
            <div className={s.register} onKeyUp={e => {
                e.keyCode === 13 && this.registBtnHandler(e);
            }}>
                <div className={s.info}>
                    <p>即刻加入 solo</p>
                    <p>尽兴创作</p>
                </div>
                <input key={authType} placeholder={placeholder} />
                <input placeholder='密码' />
                <div className={s.oauth}>
                    <div className={emailClass} onClick={() => this.changeAuthType(AUTH_TYPE.EMAIL)} />
                    <div className={phoneClass} onClick={() => this.changeAuthType(AUTH_TYPE.PHONE)}/>
                </div>
                <div>
                    <div className={s.btn} onClick={this.registBtnHandler}>注册</div>
                    <div className={cs(s.btn, s.noBackground)} onClick={() => this.changeStage(STAGE_MAP.PRE_AUTH)}>返回</div>
                </div>
            </div>
        );
    }

    renderContent () {
        switch (this.stage) {
        case STAGE_MAP.START: return this.renderFirst();
        case STAGE_MAP.PRE_AUTH: return this.renderPreAuth();
        case STAGE_MAP.LOGIN: return this.renderPreAuth();
        case STAGE_MAP.REGISTER: return this.renderRegistration();
        default: return this.renderFirst();
        }
    }

    render () {
        const containerClass = cs(s.container, {
            [s.goTop]: this.stage !== STAGE_MAP.START,
        });
        return (
            <div className={containerClass}>
                <div className={s.logo}><h1>Solo</h1></div>
                {/* {this.showMask && <div className={s.mask} />} */}
                {this.renderContent()}
            </div>
        );
    }
}
