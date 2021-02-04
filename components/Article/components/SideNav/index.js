import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import cs from 'classnames';
import s from './index.scss';

export default function SideNav(props) {
    useStyles(s);
    const { store } = useStores();
    const { navItems, activeView } = store;
    const handleClick = (item) => {
        store.handleNav(item);
    };

    return (
        <div className={s.container}>
            {
                navItems.map((item, idx) => (
                    <span
                        key={idx}
                        className={cs(s.item, {
                            [s.active]: activeView === item.index,
                        })}
                        onClick={() => handleClick(item)}
                        style={item.style}
                    >
                        <span className={`iconfont ${item.icon}`} />
                        <span>{item.title}</span>
                    </span>
                ))
            }
        </div >
    );
};
