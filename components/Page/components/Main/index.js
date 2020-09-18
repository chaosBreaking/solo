import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { inject, observer } from 'mobx-react';
import MainTab from '../MainTab';

import s from './index.scss';

const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;

function Main(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.topLine}>
                <div className={s.tabs}>
                    <MainTab />
                </div>
                <div className={s.funcBtns}>
                    <div className={s.chat}><Icon name={'icon-i-message'} />私信</div>
                    <div className={s.share}><Icon name={'icon-fenxiang2'} />分享</div>
                </div>
            </div>
        </div>
    );
};

export default inject('store')(observer(Main));
