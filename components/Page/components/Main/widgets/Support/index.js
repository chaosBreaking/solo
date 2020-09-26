import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { inject, observer } from 'mobx-react';
import cs from 'classnames';

import s from './index.scss';
import Avatar from '@widgets/Avatar';

const Block = ({ className, children }) => <div className={cs(s.block, className)}>{children}</div>;
const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;

function Support(props) {
    useStyles(s);
    return (<>
        <div className={s.section}>
            <Block className={s.head}>
                <div className={s.info}>
                    <p>赞助数</p>
                    <p className={s.num}>123</p>
                </div>
                <div className={s.info}>
                    <p>粉丝数</p>
                    <p className={s.num}>886</p>
                </div>
                <div className={s.info}>
                    <p>订阅数</p>
                    <p className={s.num}>12</p>
                </div>
            </Block>
            <Block>
                赞助
            </Block>
        </div>
        <div className={s.section}>
            <Block className={s.rank}>
                <p className={s.title}>赞助榜</p>
                <div className={s.avatars}>
                    <Avatar isFake />
                    <Avatar isFake />
                    <Avatar isFake />
                </div>
            </Block>
        </div>
    </>);
};

export default inject('store')(observer(Support));
