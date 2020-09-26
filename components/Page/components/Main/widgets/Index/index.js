import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import { inject, observer } from 'mobx-react';

import s from './index.scss';
import TagsBox from '@widgets/TagsBox';
import Support from '../Support';

const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;
const Card = ({ className, children }) => <div className={cs(s.card, className)}>{children}</div>;

function Index(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.left}>
            </div>
            <div className={s.right}>
                <Card className={s.intro}>
                    <h4>关于矢川三郎</h4>
                    <p>前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。</p>
                    <div className={s.tags}>
                        <span>科技</span>
                        <span>摇滚</span>
                        <span>艺术</span>
                    </div>
                </Card>
                <Support />
            </div>
        </div>
    );
};

export default inject('store')(observer(Index));
