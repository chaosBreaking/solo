import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Logo from '@widgets/Logo';
import { FlexSearchBar } from '@widgets/SearchBar';
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

const tooltips = [
    {
        title: '控制台',
        icon: 'icon-dashboard',
        url: 'manage.html',
    },
    {
        title: '消息',
        icon: 'icon-message',
        url: '',
    },
    {
        title: '新建',
        icon: 'icon-add',
        url: '',
    },
];

export default function NavigationBar(props) {
    useStyles(s);
    const clickNavItem = item => {
        const { url } = item;
        url && forward(url);
    };
    const handleTooltipClick = item => {
        const { url } = item;
        url && forward(url);
    };

    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.left}>
                    <Logo size={'middle'} />
                    <FlexSearchBar />
                    <div className={s.items}>
                        {
                            ITEMS.map(
                                item => <div
                                    className={s.navItem}
                                    key={item.title}
                                    onClick={() => clickNavItem(item)}
                                >
                                    {item.title}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={s.right}>
                    {
                        tooltips.map((item, index) => <div
                            key={index}
                            className={s.iconBtn}
                            tooltip={item.title}
                            flow="down"
                            onClick={() => handleTooltipClick(item)}
                        >
                            <span className={`iconfont ${item.icon}`} />
                        </div>)
                    }
                    <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'small'} />
                </div>
            </div>
        </div>
    );
};
