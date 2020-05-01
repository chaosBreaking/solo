import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { STAGE_MAP, AUTH_TYPE } from '../../constants';
import cs from 'classnames';
import s from './index.scss';

const SLOGAN = ['Don\'t be afraid to dream', 'Just Solo!'];
const ERROR_MAP = {
    ID: 0,
    PASSWD: 1,
    CONFIRM_PASSWD: 2,
    NICKNAME: 3
};

@withStyles(s)
@inject('store')
@observer
export default class AuthCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            stage: 0,
            authType: 0,
            idInput: {
                0: 'x491807573@qq.com'
            },
            passwd: '',
            nickname: '',
            showErrorMsg: false,
            error: {},
            errorMsg: '',
        };
    }

    get store () {
        return this.props.store;
    }

    get stage () {
        return +this.state.stage;
    }

    get showMask () {
        return this.stage !== 0;
    }

    changeStage (stage) {
        this.setState({ stage });
    }

    loginBtnHandler = e => {
        e.stopPropagation();
    }

    registBtnHandler = e => {
        e.stopPropagation();
    }

    changeAuthType = authType => {
        this.cleanError();
        this.setState({ authType });
    }

    showError (key, errorMsg) {
        const { error = {} } = this.state;
        error[key] = true;
        this.setState({
            errorMsg,
            showErrorMsg: true,
            error
        });
    }

    cleanError (key) {
        const { error = {} } = this.state;
        error[key] = false;
        this.setState({
            error
        });
    }

    preAuthInputHandler = e => {
        e && e.stopPropagation();
        const authType = this.state.authType;
        const obj = this.state.idInput;
        obj[authType] = e.target.value;
        this.setState({
            idInput: obj
        });
    }

    onNextStepClick = async e => {
        e.stopPropagation();
        if (!this.state.idInput[this.state.authType]) {
            return this.showError(ERROR_MAP.ID, '请填写邮箱或手机');
        }
        const data = await this.store.preAuth(this.state.idInput[this.state.authType]);
        const { authType, stage } = data;
        if (authType === AUTH_TYPE.ERROR) {
            this.showError();
        } else {
            this.setState({ stage, authType });
        }
    }

    onSignInClick = async e => {
        e.stopPropagation();
    }

    onRegisterClick = async e => {
        e.stopPropagation();
    }

    passwdInput = e => {
        e && e.stopPropagation();
        this.setState({
            passwd: e.target.value
        });
    }

    nicknameInput = e => {
        e && e.stopPropagation();
        this.setState({
            nickname: e.target.value
        });
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
        const idInputClass = cs(s.idInput, {
            [s.errorInput]: this.state.error[ERROR_MAP.ID] && this.state.showErrorMsg
        });
        return (
            <div className={s.login} onKeyUp={e => {
                e.keyCode === 13 && this.onNextStepClick(e);
            }}>
                <div className={s.info}>
                    <p>多说无益，在这里汇聚灵感</p>
                    <p>Just solo</p>
                </div>
                {
                    this.state.showErrorMsg
                        ? <div className={s.errorMsg}>
                            {this.state.errorMsg}
                        </div>
                        : null
                }
                {
                    this.stage === STAGE_MAP.PRE_AUTH
                        ? <input className={idInputClass} value={this.state.idInput[this.state.authType]} key={'userName'} placeholder='邮箱/手机号' onChange={this.preAuthInputHandler} />
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
        const { authType, idInput } = this.state;
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
                <div key={authType} className={s.inputBox}>
                    {idInput[authType] && <input placeholder={idInput[authType]} className={s.infoInput} disabled={true} />}
                    <input type="password" placeholder='密码' onChange={this.passwdInput} />
                    <input type="password" placeholder='再次确认密码' onChange={this.passwdInput} />
                    <input key={authType} placeholder='昵称' onChange={this.nicknameInput} />
                    {authType === AUTH_TYPE.PHONE && <input key={authType} placeholder='验证码' />}
                </div>
                <div className={s.oauth}>
                    <div className={emailClass} onClick={() => this.changeAuthType(AUTH_TYPE.EMAIL)} />
                    <div className={phoneClass} onClick={() => this.changeAuthType(AUTH_TYPE.PHONE)} />
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
