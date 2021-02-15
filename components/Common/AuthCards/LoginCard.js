import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import Card from '@widgets/Card';
import Button from '@widgets/Button';
import Input from '@widgets/Input';
import CloseIcon from '@widgets/CloseIcon';
import { isEmail, isPhoneNumberCN } from '@utils/validate';
import {
    AUTH_TYPE,
    ERROR_MSGS,
    defaultRef,
    MIN_PASSWORD_LENGTH,
    validateRes,
    formatPhone
} from './common';
import OAuthBar from './OAuthBar';
import CodeInput from './CodeInput';
import Logo from '@widgets/Logo';
import { formatAuthData } from '@framework/auth';
import s from './index.scss';

const TITLE = '登录';

export default (inject('store')((observer(function LoginCard(props) {
    useStyles(s);
    const {
        store,
        backHandler,
        transparent,
        handleSubmit,
        showClose,
        showBack,
        showRegister,
    } = props;
    const [formState, updateFormData] = useState({
        loading: false,
        authType: AUTH_TYPE.EMAIL,
        countdown: 0,
    });
    const updateState = data => updateFormData({
        ...formState,
        ...data,
    });
    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => {
            if (formState.countdown) {
                updateState({
                    countdown: formState.countdown - 1,
                });
            } else {
                timer && clearTimeout(timer);
            }
        }, 1000);
        return () => timer && clearTimeout(timer);
    }, [formState.countdown]);
    const switchAuthType = () => {
        const authType = formState.authType === AUTH_TYPE.PHONE ? AUTH_TYPE.EMAIL : AUTH_TYPE.PHONE;
        updateState({ authType });
    };
    const refs = {
        emailRef: defaultRef,
        passwdRef: defaultRef,
        phoneRef: defaultRef,
        codeRef: defaultRef,
    };
    const emailInputValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.EMAIL_EMPTY);
        if (!isEmail(input)) return validateRes(false, ERROR_MSGS.EMAIL_INVALID);
        return validateRes(true);
    };
    const passwdInputValidator = (input, isRepeatOne) => {
        const { passwdRef } = refs;
        const originalPasswd = passwdRef().getInput();
        if (!originalPasswd) return validateRes(false, ERROR_MSGS.PASSWD_EMPTY);
        if (originalPasswd.length < MIN_PASSWORD_LENGTH) return validateRes(false, ERROR_MSGS.PASSWD_TOO_SHORT);
        return validateRes(true);
    };
    const phoneInputValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.PHONE_EMPTY);
        const formattedPhone = formatPhone(input);
        if (!isPhoneNumberCN(formattedPhone)) return validateRes(false, ERROR_MSGS.PHONE_INVALID);
        return validateRes(true);
    };
    const btnClickHandler = async e => {
        e && e.stopPropagation();
        const authRefs = formState.authType === AUTH_TYPE.EMAIL
            ? [refs.emailRef, refs.passwdRef]
            : [refs.phoneRef, refs.codeRef];
        const validInput = Object.values(authRefs).map(ref => ref().doValidate({ forceValidate: true })).every(res => !!res);
        if (!validInput) return;
        updateState({
            loading: true,
        });
        const authData = formatAuthData({
            email: refs.emailRef().getInput(),
            passwd: refs.passwdRef().getInput(),
            type: formState.authType,
        });
        typeof handleSubmit === 'function' && await handleSubmit(authData);
        updateState({
            loading: false,
        });
    };
    const closeBtnHandler = e => {
        e && e.stopPropagation();
        store.switchLoginCard(false);
    };
    const containerClass = cs(s.container, s.loginCard, {
        [s.transparent]: transparent,
    });
    const inputClass = {
        error: s.errorInput,
        msg: s.errorMsg,
    };
    return (
        <Card className={containerClass}>
            <Logo className={s.logo} noLink size={'large'} />
            <div className={s.title}>
                <span>{TITLE}</span>
                {showClose && <CloseIcon className={s.close} onClick={closeBtnHandler} />}
            </div>
            <div className={s.loginBody} onKeyUp={e => {
                e.keyCode === 13 && btnClickHandler(e);
            }} >
                <div className={s.inputBox} key={formState.authType}>
                    {
                        formState.authType === AUTH_TYPE.EMAIL
                            ? <>
                                <Input
                                    classNames={inputClass}
                                    placeholder={'邮箱'}
                                    validateInput={emailInputValidator}
                                    onChange={email => updateState({ email })}
                                    getRef={func => (refs.emailRef = func)}
                                />
                                <Input
                                    classNames={inputClass}
                                    type={'password'}
                                    placeholder={'输入密码'}
                                    errorMsg={'errorr'}
                                    validateInput={passwdInputValidator}
                                    onChange={passwd => updateState({ passwd })}
                                    getRef={func => (refs.passwdRef = func)}
                                />
                            </>
                            : <>
                                <Input
                                    classNames={inputClass}
                                    placeholder={'手机号码'}
                                    validateInput={phoneInputValidator}
                                    getRef={func => (refs.phoneRef = func)}
                                />
                                <CodeInput
                                    addRefFunc={func => (refs.codeRef = func)}
                                    getPhoneNumberFunc={() => refs.codeRef().getInput()}
                                />
                            </>
                    }
                </div>
                <Button className={s.btn} text={'登录'} loading={formState.loading} onClick={btnClickHandler} />
                {showBack && <Button text={'返回'} plain onClick={backHandler} />}
                {showRegister && <Button text={'没有账号？立即注册'} plain onClick={backHandler} />}
                <div className={s.oauthTip}>其他登录方式</div>
                <OAuthBar authType={formState.authType} switchAuthType={switchAuthType} />
            </div>
        </Card>
    );
}))));
