import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Logo from '@widgets/Logo';
import SearchBar from '@widgets/SearchBar';
import Avatar from '@widgets/Avatar';
import { forward } from '@utils/navi';
import s from './index.scss';

const ITEMS = [
    {
        title: '草稿',
        url: ''
    },
    {
        title: '疑问',
        url: ''
    },
    {
        title: '发现',
        url: '/explore'
    },
];

function NavigationBar (props) {
    const clickNavItem = url => {
        // forward(url);
    };

    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.left}>
                    {/* <Logo size={'middle'} /> */}
                    <SearchBar />
                    <div className={s.items}>
                        {
                            ITEMS.map(
                                item => <div
                                    className={s.navItem}
                                    key={item.title}
                                    onClick={clickNavItem.bind(this, item.url)}
                                >
                                    {item.title}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={s.right}>
                    <div className={`${s.iconBtn} ${s.notifications}`} tooltip="消息" flow="down" />
                    <div className={`${s.iconBtn} ${s.createBtn}`} tooltip="创建" flow="down" />
                    <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'small'} />
                </div>
            </div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
