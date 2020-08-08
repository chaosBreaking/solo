import React, { useState } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';
import Card from '@widgets/Card';
import Button from '@widgets/Button';
import Input from '@widgets/Input';
import { isEmail } from '@utils/validate';

const TITLE = '创建你的社群，从这里开始';
const validateRes = (isValid, msg) => {
    return { isValid, msg };
};
const MAX_NICKNAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 6;
const ERROR_MSGS = {
    NICKNAME_EMPTY: '请输入一个昵称吧~',
    NICKNAME_LENGTH_LIMIT: `昵称最大长度为${MAX_NICKNAME_LENGTH}个字符哦~`,

    EMAIL_EMPTY: '请输入您的邮箱地址哦~',
    EMAIL_INVALID: '请输入一个有效的邮箱地址哦~',

    PASSWD_EMPTY: '请设定一个密码吧~',
    PASSWD_REPEAT_EMPTY: '请再输入一次密码哦~',
    PASSWD_NOT_SYNC: '两次输入密码不一致哦~',
    PASSWD_TOO_SHORT: '密码长度至少要6位哦~',
};

const defaultRef = () => ({
    getInput: () => {},
    doValidate: () => {},
});

export default withStyles(s)(observer(function RegistryCard (props) {
    const {
        handleSubmit,
        switchLogin,
    } = props;
    const [formState, updateFormData] = useState({
        loading: false,
        nickname: '',
        email: '',
        passwd: '',
        rePasswd: '',
    });
    const nicknameValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.NICKNAME_EMPTY);
        if (input.length > MAX_NICKNAME_LENGTH) return validateRes(false, ERROR_MSGS.NICKNAME_LENGTH_LIMIT);
        return { isValid: true };
    };
    const emailInputValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.EMAIL_EMPTY);
        if (!isEmail(input)) return validateRes(false, ERROR_MSGS.EMAIL_INVALID);
        return { isValid: true };
    };
    const passwdInputValidator = (input, isRepeatOne) => {
        const { passwdRef, rePasswdRef } = refs;
        const originalPasswd = passwdRef().getInput();
        const repeatedPasswd = rePasswdRef().getInput();
        if (isRepeatOne) {
            if (originalPasswd && !repeatedPasswd) return validateRes(false, ERROR_MSGS.PASSWD_REPEAT_EMPTY);
            if (originalPasswd && originalPasswd !== repeatedPasswd) return validateRes(false, ERROR_MSGS.PASSWD_NOT_SYNC);
        } else {
            if (!originalPasswd) return validateRes(false, ERROR_MSGS.PASSWD_EMPTY);
            if (originalPasswd.length < MIN_PASSWORD_LENGTH) return validateRes(false, ERROR_MSGS.PASSWD_TOO_SHORT);
        }
        return { isValid: true };
    };
    const btnClickHandler = async e => {
        e && e.stopPropagation();
        const isValidRes = Object.values(refs).map(ref => ref().doValidate({ forceValidate: true })).find(res => !!res);
        if (!isValidRes) return;
        updateFormData({
            loading: true,
        });
        // const { nickname, email, passwd } = formState;
        const res = await handleSubmit({
            nickname: refs.nicknameRef().getInput(),
            email: refs.emailRef().getInput(),
            passwd: refs.passwdRef().getInput(),
        });
        if (res) {
            console.log(res);
        }
    };
    const refs = {
        nicknameRef: defaultRef,
        emailRef: defaultRef,
        passwdRef: defaultRef,
        rePasswdRef: defaultRef,
    };
    return (
        <Card className={s.container}>
            <div className={s.title}>{TITLE}</div>
            <div>
                <div className={s.inputBox} onKeyUp={e => {
                    e.keyCode === 13 && this.registBtnHandler(e);
                }}>
                    <Input
                        classNames={{
                            normal: '',
                            error: s.errorInput,
                            msg: s.errorMsg,
                        }}
                        placeholder={'昵称'}
                        validateInput={nicknameValidator}
                        onChange={nickname => updateFormData({ ...formState, nickname })}
                        getRef={func => (refs.nicknameRef = func)}
                    />
                    <Input
                        classNames={{
                            normal: '',
                            error: s.errorInput,
                            msg: s.errorMsg,
                        }}
                        placeholder={'邮箱地址'}
                        validateInput={emailInputValidator}
                        onChange={email => updateFormData({ ...formState, email })}
                        getRef={func => (refs.emailRef = func)}
                    />
                    <Input
                        classNames={{
                            normal: '',
                            error: s.errorInput,
                            msg: s.errorMsg,
                        }}
                        type={'password'}
                        placeholder={'设定密码'}
                        errorMsg={'errorr'}
                        validateInput={passwdInputValidator}
                        onChange={passwd => updateFormData({ ...formState, passwd })}
                        getRef={func => {
                            refs.passwdRef = func;
                        }}
                    />
                    <Input
                        classNames={{
                            normal: '',
                            error: s.errorInput,
                            msg: s.errorMsg,
                        }}
                        type={'password'}
                        placeholder={'再次确认密码'}
                        errorMsg={'errorr'}
                        validateInput={input => passwdInputValidator(input, true)}
                        onChange={rePasswd => updateFormData({ ...formState, rePasswd })}
                        getRef={func => {
                            refs.rePasswdRef = func;
                        }}
                    />
                </div>
                <Button className={s.btn} text={'注册'} loading={formState.loading} onClick={btnClickHandler} />
                <div className={s.oauthTip}>第三方登录</div>
                <div className={s.oauth}>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGoogle)} /></div>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGithub)} /></div>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconFacebook)} /></div>
                </div>
                <Button text={'已有账号？点击登录'} plain className={s.loginBtn} onClick={switchLogin} />
            </div>
        </Card>
    );
}));
