import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';
import Card from '@widgets/Card';
import Button from '@widgets/Button';
import Input from '@widgets/Input';
import CloseIcon from '@widgets/CloseIcon';
import { isEmail, isPhoneNumberCN } from '@utils/validate';
import { AUTH_TYPE, CODE_TYPES, ERROR_MSGS, defaultRef, MIN_PASSWORD_LENGTH, validateRes } from './common';
import AuthService from '@framework/common/services/AuthService';
import OAuthBar from './OAuthBar';

const getSendCodeBtn = countdown => {
    return !countdown ? '发送验证码' : `重新发送(${countdown})s`;
};
const formatPhone = phone => ('' + phone).startsWith('+86-') ? phone : `+86-${phone}`;

export default withStyles(s)(inject('store')((observer(function LoginCard (props) {
    const {
        store,
        backHandler,
        transparent,
        handleSubmit,
    } = props;
    const [formState, updateFormData] = useState({
        loading: false,
        authType: AUTH_TYPE.PHONE,
        countdown: 0,
    });
    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => {
            if (formState.countdown) {
                updateFormData({
                    countdown: formState.countdown - 1,
                });
            } else {
                timer && clearTimeout(timer);
            }
        }, 1000);
        return () => timer && clearTimeout(timer);
    }, [formState.countdown]);
    const authService = new AuthService();
    const switchAuthType = () => {
        const authType = formState.authType === AUTH_TYPE.PHONE ? AUTH_TYPE.EMAIL : AUTH_TYPE.PHONE;
        updateFormData({ authType });
    };
    const refs = {
        emailRef: defaultRef,
        passwdRef: defaultRef,
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
    const codeInputValidator = input => {
        return validateRes(true);
    };
    const btnClickHandler = async e => {
        e && e.stopPropagation();
        const validInput = Object.values(refs).map(ref => ref().doValidate({ forceValidate: true })).every(res => !!res);
        if (!validInput) return;
        updateFormData({
            loading: true,
        });
        await handleSubmit({
            email: refs.emailRef().getInput(),
            passwd: refs.passwdRef().getInput(),
        });
        updateFormData({
            loading: false,
        });
    };
    const sendCode = async () => {
        if (formState.countdown > 0 || !refs.phoneRef().getInput()) {
            return;
        }
        try {
            const res = await authService.sendValidateVode({
                phone: formatPhone(refs.phoneRef().getInput()),
                type: CODE_TYPES.REGISTER,
            });
            if (res.success) {
                updateFormData({
                    countdown: 59,
                });
            }
        } catch (error) {
            return { success: false, msg: error.errorMsg };
        }
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
            <div className={s.title}>
                <span>登录</span>
                <CloseIcon className={s.close} onClick={closeBtnHandler} />
            </div>
            <div className={s.loginBody} onKeyUp={e => {
                e.keyCode === 13 && this.registBtnHandler(e);
            }} >
                <div className={s.inputBox} key={formState.authType}>
                    {
                        formState.authType === AUTH_TYPE.EMAIL
                            ? <>
                                <Input
                                    classNames={inputClass}
                                    placeholder={'邮箱'}
                                    validateInput={emailInputValidator}
                                    onChange={email => updateFormData({ ...formState, email })}
                                    getRef={func => (refs.emailRef = func)}
                                />
                                <Input
                                    classNames={inputClass}
                                    type={'password'}
                                    placeholder={'输入密码'}
                                    errorMsg={'errorr'}
                                    validateInput={passwdInputValidator}
                                    onChange={passwd => updateFormData({ ...formState, passwd })}
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
                                <div style={{ display: 'flex' }}>
                                    <Input
                                        classNames={inputClass}
                                        placeholder={'验证码'}
                                        maxLength={6}
                                        validateInput={codeInputValidator}
                                        getRef={func => (refs.codeRef = func)}
                                    />
                                    <Button
                                        className={s.sendCodeBtn}
                                        text={getSendCodeBtn(formState.countdown)}
                                        onClick={sendCode}
                                        disabled={formState.countdown > 0}
                                    />
                                </div>
                            </>
                    }
                </div>
                <Button className={s.btn} text={'登录'} loading={formState.loading} onClick={btnClickHandler} />
                <Button text={'返回'} plain onClick={backHandler} />
                <div className={s.oauthTip}>第三方登录</div>
                <OAuthBar authType={formState.authType} switchAuthType={switchAuthType} />
            </div>
        </Card>
    );
}))));
