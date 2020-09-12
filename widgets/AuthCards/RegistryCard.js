import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import Card from '@widgets/Card';
import Button from '@widgets/Button';
import Input from '@widgets/Input';
import { isEmail, isPhoneNumberCN } from '@utils/validate';
import {
    AUTH_TYPE,
    ERROR_MSGS,
    defaultRef,
    MAX_NICKNAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    validateRes,
    formatPhone
} from './common';
import OAuthBar from './OAuthBar';
import CodeInput from './CodeInput';
import Logo from '@widgets/Logo';

// const TITLE = '创建你的社群，从这里开始'; // 放在 成为创作者 页面
const TITLE = '即刻加入';

export default withStyles(s)(observer(function RegistryCard(props) {
    const {
        handleSubmit,
        switchLogin,
    } = props;
    const [formState, updateFormData] = useState({
        loading: false,
        authType: AUTH_TYPE.EMAIL,
        haveSentCode: false,
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
    const refs = {
        nicknameRef: defaultRef,
        phoneRef: defaultRef,
        emailRef: defaultRef,
        passwdRef: defaultRef,
        rePasswdRef: defaultRef,
        codeRef: defaultRef,
    };

    const nicknameValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.NICKNAME_EMPTY);
        if (input.length > MAX_NICKNAME_LENGTH) return validateRes(false, ERROR_MSGS.NICKNAME_LENGTH_LIMIT);
        return validateRes(true);
    };
    const emailInputValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.EMAIL_EMPTY);
        if (!isEmail(input)) return validateRes(false, ERROR_MSGS.EMAIL_INVALID);
        return validateRes(true);
    };
    const phoneInputValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.PHONE_EMPTY);
        const formattedPhone = formatPhone(input);
        if (!isPhoneNumberCN(formattedPhone)) return validateRes(false, ERROR_MSGS.PHONE_INVALID);
        return validateRes(true);
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
        return validateRes(true);
    };
    const switchAuthType = () => {
        const authType = formState.authType === AUTH_TYPE.PHONE ? AUTH_TYPE.EMAIL : AUTH_TYPE.PHONE;
        updateState({ authType });
    };
    const btnClickHandler = async e => {
        e && e.stopPropagation();
        const basicRefs = [refs.nicknameRef];
        const authRefs = [...basicRefs, ...formState.authType === AUTH_TYPE.EMAIL
            ? [refs.emailRef, refs.passwdRef, refs.rePasswdRef]
            : [refs.codeRef, refs.phoneRef]];
        const validInput = Object.values(authRefs).map(ref => ref().doValidate({ forceValidate: true })).every(res => !!res);
        if (!validInput) return;
        updateState({
            loading: true,
        });
        await handleSubmit({
            nickname: refs.nicknameRef().getInput(),
            email: refs.emailRef().getInput(),
            phone: formatPhone(refs.phoneRef().getInput()),
            passwd: refs.passwdRef().getInput(),
            code: refs.codeRef().getInput(),
            authType: formState.authType,
        });
        updateState({
            loading: false,
        });
    };
    const inputClass = {
        error: s.errorInput,
        msg: s.errorMsg,
    };
    const renderForm = authType => {
        return authType === AUTH_TYPE.EMAIL
            ? <>
                <Input
                    classNames={inputClass}
                    placeholder={'昵称'}
                    validateInput={nicknameValidator}
                    getRef={func => (refs.nicknameRef = func)}
                />
                <Input
                    classNames={inputClass}
                    placeholder={'邮箱'}
                    validateInput={emailInputValidator}
                    getRef={func => (refs.emailRef = func)}
                />
                <Input
                    classNames={inputClass}
                    type={'password'}
                    placeholder={'设定密码'}
                    errorMsg={'errorr'}
                    validateInput={passwdInputValidator}
                    getRef={func => {
                        refs.passwdRef = func;
                    }}
                />
                <Input
                    classNames={inputClass}
                    type={'password'}
                    placeholder={'再次确认密码'}
                    errorMsg={'errorr'}
                    validateInput={input => passwdInputValidator(input, true)}
                    getRef={func => {
                        refs.rePasswdRef = func;
                    }}
                />
            </>
            : <>
                <Input
                    classNames={inputClass}
                    placeholder={'昵称'}
                    validateInput={nicknameValidator}
                    getRef={func => (refs.nicknameRef = func)}
                />
                <Input
                    classNames={inputClass}
                    placeholder={'手机号码'}
                    validateInput={phoneInputValidator}
                    getRef={func => (refs.phoneRef = func)}
                />
                <CodeInput
                    addRefFunc={func => (refs.codeRef = func)}
                    getPhoneNumberFunc={() => refs.phoneRef().getInput()}
                />
            </>;
    };
    return (
        <Card className={s.container} key={formState.authType}>
            <Logo className={s.logo} noLink size={'large'} />
            <div className={s.title}>{TITLE}</div>
            <div>
                <div className={s.inputBox} onKeyUp={e => {
                    e.keyCode === 13 && btnClickHandler(e);
                }}>
                    {renderForm(formState.authType)}
                </div>
                <Button className={s.btn} text={'注册'} loading={formState.loading} onClick={btnClickHandler} />
                <div className={s.oauthTip}>其他登录方式</div>
                <OAuthBar authType={formState.authType} switchAuthType={switchAuthType} />
                <Button text={'已有账号？点击登录'} plain className={s.loginBtn} onClick={switchLogin} />
            </div>
        </Card>
    );
}));
