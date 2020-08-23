import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';
import { authService, AUTH_TYPE, CODE_TYPES, getSendCodeBtn, formatPhone } from './common';
import { toast } from 'react-toastify';
import Button from '@widgets/Button';

export default withStyles(s)(observer(function SendCodeButton (props) {
    const {
        authType,
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
            return toast.error('请输入手机号码', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
        try {
            const res = await authService.sendValidateCode({
                phone: formatPhone(getPhoneNumberFunc()),
                type: CODE_TYPES.LOGIN,
            });
            if (res.success) {
                setCountdown(59);
            }
        } catch (error) {
            const { code, message } = error;
            if (code === 400) {
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            return { success: false, msg: error.errorMsg };
        }
    };
    return (
        <div className={s.btn}>
            <Button
                className={s.sendCodeBtn}
                text={getSendCodeBtn(countdown)}
                onClick={sendCode}
                disabled={countdown > 0}
            />
        </div>
    );
}));
