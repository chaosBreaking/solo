import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';
import useStores from '@framework/util';

export default function SideNav(props) {
    useStyles(s);
    const { store } = useStores();
    const { navItems } = store;
    const handleClick = (item) => {
        store.handleNav(item);
    };

    return (
        <div className={s.container}>
            {
                navItems.map((item, index) => (
                    <span key={index} className={s.item} onClick={() => handleClick(item)}>
                        <span className={`iconfont ${item.icon}`} />
                        <span>{item.title}</span>
                    </span>
                ))
            }
        </div >
    );
};
