import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';
import Card from '@widgets/Card';
import Button from '@widgets/Button';
import Input from '@widgets/Input';
import CloseIcon from '@widgets/CloseIcon';
import { isEmail } from '@utils/validate';
import { ERROR_MSGS, defaultRef, MIN_PASSWORD_LENGTH, validateRes } from './common';

export default withStyles(s)(inject('store')((observer(function LoginCard (props) {
    const {
        store,
        backHandler,
        transparent,
    } = props;
    const [formState, updateFormData] = useState({
        loading: false,
        nickname: '',
        email: '',
        password: '',
        confirmPasswd: '',
    });
    const emailInputValidator = input => {
        if (!input) return validateRes(false, ERROR_MSGS.EMAIL_EMPTY);
        if (!isEmail(input)) return validateRes(false, ERROR_MSGS.EMAIL_INVALID);
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
    const btnClickHandler = async e => {
        e && e.stopPropagation();
        const validInput = Object.values(refs).map(ref => ref().doValidate({ forceValidate: true })).every(res => !!res);
        if (!validInput) return;
        updateFormData({
            loading: true,
        });
        // const { nickname, email, passwd } = formState;
        // const res = await handleSubmit({
        //     nickname: refs.nicknameRef().getInput(),
        //     email: refs.emailRef().getInput(),
        //     passwd: refs.passwdRef().getInput(),
        // });
        // if (res) {
        //     console.log(res);
        // }
    };
    const refs = {
        emailRef: defaultRef,
        passwdRef: defaultRef,
    };
    const closeBtnHandler = e => {
        e && e.stopPropagation();
        store.switchLoginCard(false);
    };
    const containerClass = cs(s.container, s.loginCard, {
        [s.transparent]: transparent,
    });
    return (
        <Card className={containerClass}>
            <div className={s.title}>
                <span>登录</span>
                <CloseIcon className={s.close} onClick={closeBtnHandler} />
            </div>
            <div className={s.loginBody} onKeyUp={e => {
                e.keyCode === 13 && this.registBtnHandler(e);
            }} >
                <div className={s.inputBox}>
                    <Input
                        classNames={{
                            normal: '',
                            error: s.errorInput,
                            msg: s.errorMsg,
                        }}
                        placeholder={'邮箱'}
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
                        placeholder={'输入密码'}
                        errorMsg={'errorr'}
                        validateInput={passwdInputValidator}
                        onChange={passwd => updateFormData({ ...formState, passwd })}
                        getRef={func => {
                            refs.passwdRef = func;
                        }}
                    />
                </div>
                <Button className={s.btn} text={'登录'} loading={formState.loading} onClick={btnClickHandler} />
                <Button text={'返回'} plain onClick={backHandler} />
                <div className={s.oauthTip}>第三方登录</div>
                <div className={s.oauth}>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGoogle)} /></div>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconGithub)} /></div>
                    <div className={s.iconBtnWrapper}><div className={cs(s.iconBtn, s.iconFacebook)} /></div>
                </div>
            </div>
        </Card>
    );
}))));
