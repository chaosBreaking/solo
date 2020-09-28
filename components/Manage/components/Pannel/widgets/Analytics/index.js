import React from 'react';
import { inject, observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import cs from 'classnames';
import s from './index.scss';

const Block = ({ children }) => <div className={s.block}>{children}</div>;

function Analytics(props) {
    useStyles(s);

    return (
        <div className={s.container}>
            <div className={s.title}>
                <span>近7天趋势</span>
            </div>
            <div className={s.body}>
                <Block>
                    <span className={s.index}>访问量</span>
                    <span className={s.value}>611</span>
                </Block>
                <Block>
                    <span className={s.index}>新增粉丝数</span>
                    <span className={s.value}>61</span>
                </Block>
                <Block>
                    <span className={s.index}>新增赞助</span>
                    <span className={s.value}>¥0</span>
                </Block>
            </div>
        </div >
    );
};

export default React.memo(Analytics);
