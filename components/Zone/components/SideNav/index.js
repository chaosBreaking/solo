import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

const icons = [
    {
        title: '文章',
        url: '',
        icon: 'icon-wenzhang1',
    },
    {
        title: '动态',
        url: '',
        icon: 'icon-tansuo01',
    },
    {
        title: '部落',
        url: '',
        icon: 'icon-shequ',
    },
    {
        title: '我の窝',
        url: '',
        icon: 'icon-planet1',
    },
];

export default function SideNav(props) {
    useStyles(s);
    const handleClick = (item) => {

    };

    return (
        <div className={s.container}>
            {
                icons.map((item, index) => (
                    <span key={index} className={s.item} onClick={() => handleClick(item)}>
                        <span className={`iconfont ${item.icon}`} />
                        <span>{item.title}</span>
                    </span>
                ))
            }
        </div >
    );
};
