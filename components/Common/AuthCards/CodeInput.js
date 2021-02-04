import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import {
    authService,
    CODE_TYPES,
    getSendCodeBtn,
    formatPhone,
    validateRes,
    ERROR_MSGS
} from './common';
import { isPhoneNumberCN } from '@utils/validate';
import { toast } from 'react-toastify';
import Button from '@widgets/Button';
import Input from '@widgets/Input';
import s from './index.scss';

export default (observer(function CodeInput(props) {
    useStyles(s);
    const {
        addRefFunc,
        getPhoneNumberFunc,
    } = props;
    const [countdown, setCountdown] = useState(0);
    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => {
            if (countdown) {
                setCountdown(countdown - 1);
            } else {
                timer && clearTimeout(timer);
            }
        }, 1000);
        return () => timer && clearTimeout(timer);
    }, [countdown]);
    const sendCode = async () => {
        if (countdown > 0) {
            return;
        }
        if (!getPhoneNumberFunc()) {
            toast.clearWaitingQueue();
            return toast.error(ERROR_MSGS.PHONE_EMPTY, {
                position: toast.POSITION.TOP_CENTER,
                toastId: 'code-send-empty',
            });
        }
        if (!isPhoneNumberCN(formatPhone(getPhoneNumberFunc()))) {
            toast.clearWaitingQueue();
            return toast.error(ERROR_MSGS.PHONE_INVALID, {
                position: toast.POSITION.TOP_CENTER,
                toastId: 'code-send-invalid-phone',
            });
        }
        try {
            const res = await authService.sendValidateCode({
                phone: formatPhone(getPhoneNumberFunc()),
                type: CODE_TYPES.LOGIN,
            });
            if (res.success) {
                setCountdown(59);
                toast.success('验证码发送成功', {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: 'code-send-success',
                });
            }
        } catch (error) {
            const { code, message } = error;
            if (code === 400) {
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: 'code-send-error',
                });
            }
            return { success: false, msg: error.errorMsg };
        }
    };
    const codeInputValidator = input => {
        return input
            ? validateRes(true)
            : validateRes(false, ERROR_MSGS.CODE_EMPTY);
    };
    const inputClass = {
        error: s.errorInput,
        msg: s.errorMsg,
    };
    return (
        <div style={{ display: 'flex' }}>
            <Input
                classNames={inputClass}
                placeholder={'验证码'}
                maxLength={6}
                validateInput={codeInputValidator}
                getRef={addRefFunc}
            />
            <Button
                className={s.sendCodeBtn}
                text={getSendCodeBtn(countdown)}
                onClick={sendCode}
                disabled={countdown > 0}
            />
        </div>
    );
}));
