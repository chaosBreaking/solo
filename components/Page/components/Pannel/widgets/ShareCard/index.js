import React from 'react';
import { inject, observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import cs from 'classnames';
import s from './index.scss';

const Block = ({ children }) => <div className={s.block}>{children}</div>;

function ShareCard(props) {
    useStyles(s);

    return (
        <div className={s.container}>
            <div className={s.title}>
                <span>分享我的主页</span>
            </div>
            <div className={s.body}>

            </div>
        </div >
    );
};

export default observer(ShareCard);
