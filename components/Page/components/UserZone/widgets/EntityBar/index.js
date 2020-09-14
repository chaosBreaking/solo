import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

const TYPE_ICON_URL_MAP = {
    0: 'icon_user',
    1: 'icon_org',
};

const mock = [
    {
        name: 'Keii',
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=0',
        type: 0,
    },
    {
        name: 'Bitronic Org',
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=1',
        type: 1,
    },
    {
        name: 'TIC Org',
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=2',
        type: 1,
    },
];

function EntityBar (props) {
    const { lines = mock } = props;
    const [expanded, setExpanded] = useState(false);
    const [activeSubject, setActiveSubject] = useState(lines[0]);
    // 前缀有类型icon，分类为个人和Org
    // const iconUrl = TYPE_ICON_URL_MAP[type];
    const chooseSubject = item => {
        setActiveSubject(item);
        setExpanded(!expanded);
    };
    return (
        <div className={s.container}>
            <div className={s.main} onClick={() => setExpanded(!expanded)}>
                <div className={s.typeIcon}></div>
                <Avatar src={activeSubject.avatar} size={'mini'} flat={true} noMargin={true} />
                <span className={s.name}>{activeSubject.name}</span>
            </div>
            {
                expanded && <div className={s.expandCard}>
                    {
                        lines
                            .filter(item => !(item.type === activeSubject.type && item.name === activeSubject.name))
                            .map((item, idx) =>
                                <div className={s.line} key={idx} onClick={() => chooseSubject(item)}>
                                    <Avatar src={item.avatar} size={'mini'} flat={true} noMargin={true} />
                                    <span className={s.name}>{item.name}</span>
                                </div>)
                    }
                </div>
            }
        </div>
    );
};

export default withStyles(s)(EntityBar);
