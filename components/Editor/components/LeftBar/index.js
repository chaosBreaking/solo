import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import TagInput from './TagInput';
import Cover from './Cover';
import IntroCard from './IntroCard';
import cs from 'classnames';

import s from './index.scss';

export default function LeftBar(props) {
    useStyles(s);
    const [expanded, setExpanded] = React.useState(true);
    const handleExpand = () => {
        setExpanded(!expanded);
    };
    return (
        <div className={s.container}>
            <div className={s.indicator} onClick={handleExpand}>
                发布设置
            </div>
            <div className={cs(s.main, {
                [s.show]: expanded
            })}>
                <div className={s.close} onClick={handleExpand}>
                    <span className={'iconfont icon-close'} />
                </div>
                <Cover />
                <IntroCard />
                <TagInput />
            </div>
        </div>
    );
};
