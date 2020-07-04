import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { STAGE_MAP, AUTH_TYPE, ERROR_MAP } from '../../constants';
import { forward } from '@utils/navi';
import Button from '@widgets/Button';
import cs from 'classnames';
import s from './index.scss';

const SLOGAN = ['Don\'t be afraid to dream', 'Just Solo!'];

@withStyles(s)
@inject('store')
@observer
export default class AuthCard extends Component {
    state = {
        isLoading: false,
        stage: 0,
        authType: 0,
        idInput: {
            0: ''
        },
        passwd: '',
        nickname: '',
        showErrorMsg: false,
        error: {},
        errorMsg: '',
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

    setOriginState () {
        this.setState({
            isLoading: false,
            stage: 0,
            authType: 0,
            idInput: {
                0: ''
            },
            passwd: '',
            nickname: '',
            showErrorMsg: false,
            error: {},
            errorMsg: '',
        });
    }

    back = e => {
        e.stopPropagation();
        this.setOriginState();
        switch (this.state.stage) {
        case STAGE_MAP.PRE_AUTH: {
            this.store.switchExplorer(true);
            this.changeStage(STAGE_MAP.START);
            break;
        }
        case STAGE_MAP.LOGIN:
        case STAGE_MAP.REGISTER: this.changeStage(STAGE_MAP.PRE_AUTH); break;
        }
    }

    forward () {
        forward('/explore');
    }

    changeStage (stage) {
        this.setState({ stage });
    }

    startBtnHandler = () => {
        this.store.switchExplorer(false);
        this.changeStage(STAGE_MAP.PRE_AUTH);
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
            error,
            errorMsg: '',
            showErrorMsg: false
        });
    }

    preAuthInputHandler = e => {
        e && e.stopPropagation();
        this.state.error[ERROR_MAP.ID] && this.cleanError(ERROR_MAP.ID);
        const authType = this.state.authType;
        const obj = this.state.idInput;
        obj[authType] = e.target.value;
        this.setState({
            idInput: obj
        });
    }

    onNextStepClick = async e => {
        e.stopPropagation();
        switch (this.state.stage) {
        case STAGE_MAP.PRE_AUTH: return this.onPreAuth();
        case STAGE_MAP.LOGIN: return this.onLogIn();
        }
    }

    onPreAuth = async () => {
        if (!this.state.idInput[this.state.authType]) {
            return this.showError(ERROR_MAP.ID, '请输入邮箱或手机');
        }
        this.setState({ isLoading: true });
        const data = await this.store.preAuth(this.state.idInput[this.state.authType]);
        const { authType, stage } = data;
        if (authType === AUTH_TYPE.ERROR) {
            this.showError(ERROR_MAP.ID, '邮箱或手机号码不正确');
        } else {
            this.setState({ stage, authType });
        }
        this.setState({ isLoading: false });
    }

    onLogIn = async () => {
        if (!this.state.passwd) {
            return this.showError(ERROR_MAP.PASSWD, '请输入密码');
        }
        this.setState({ isLoading: true });
        const res = await this.store.login({
            id: this.state.idInput[this.state.authType],
            passwd: this.state.passwd
        });
        const { success, error } = res;
        if (!success) {
            switch (error) {
            case ERROR_MAP.PASSWD: this.showError(ERROR_MAP.PASSWD, '密码错误'); break;
            case ERROR_MAP.NETWORK: this.showError(ERROR_MAP.PASSWD, '网络异常'); break;
            }
        } else {
            forward('/home');
        }
        this.setState({ isLoading: false });
    }

    onRegisterClick = async e => {
        e.stopPropagation();
    }

    passwdInputHandler = e => {
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
                <Button onClick={this.startBtnHandler} text={'开始吧'}/>
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
                    <p>汇聚灵感, 尽情创作</p>
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
                        : <input className={s.passwdInputHandler} type={'password'} key={'passwd'} placeholder='密钥' value={this.state.passwd} onChange={this.passwdInputHandler}/>
                }
                {
                    this.stage === STAGE_MAP.PRE_AUTH && <div className={s.oauth}>
                        <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGoogle)} /></div>
                        <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGithub)} /></div>
                        <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconFacebook)} /></div>
                    </div>
                }
                <div className={s.preAuthBtn}>
                    <Button text={btnText} onClick={this.onNextStepClick} loading={this.state.isLoading}/>
                    <Button text={'返回'} onClick={this.back} plain={true}/>
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
                    <input type="password" placeholder='密码' onChange={this.passwdInputHandler} />
                    <input type="password" placeholder='再次确认密码' onChange={this.passwdInputHandler} />
                    <input key={authType} placeholder='昵称' onChange={this.nicknameInput} />
                    {authType === AUTH_TYPE.PHONE && <input key={authType} placeholder='验证码' />}
                </div>
                <div className={s.oauth}>
                    <div className={emailClass} onClick={() => this.changeAuthType(AUTH_TYPE.EMAIL)} />
                    <div tooltip="暂不支持手机登录" flow='right'><span className={phoneClass} /></div>
                    {/* <div className={phoneClass} onClick={() => this.changeAuthType(AUTH_TYPE.PHONE)} /> */}
                </div>
                <div>
                    <Button text={'注册'} onClick={this.registBtnHandler} />
                    <Button text={'返回'} onClick={this.back} hollow={true}/>
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
        const { showExplore } = this.store;
        return (
            <div className={containerClass}>
                <div className={s.logo}><h1>Solo</h1></div>
                {this.renderContent()}
                {showExplore && <div className={s.exploreBtn} onClick={this.forward}>
                    随便逛逛
                </div>}
            </div>
        );
    }
}
