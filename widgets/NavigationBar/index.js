import React from 'react';
import { inject } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS, NAVI_FUNC_ITEMS, NAVI_ITEM_TYPE } from './constants';
import cs from 'classnames';
import Logo from '@widgets/Logo';
import { FlexSearchBar } from '@widgets/SearchBar';

import s from './index.scss';

const CLASS_TYPE_MAP = {
    1: 'navItem',
    2: 'collection',
    3: 'button',
};

const btnClickHandler = item => {
    const { type, url, action } = item || {};
    if (typeof action === 'function') {
        return action();
    }
    if (type === NAVI_ITEM_TYPE.LINK) {
        forward(url);
    }
};

function NavigationBar({ store, naviItems, funcNavItems, defaultItems, mode, bgColor = '#fff', withSearch, transparent }) {
    useStyles(s);
    const funcBtnClickHandler = item => {
        const { type } = item || {};
        if (type === NAVI_ITEM_TYPE.BUTTON) {
            store.switchLoginCard(true);
        }
    };
    const mainItems = defaultItems ? NAVI_ITEMS : naviItems;
    const subItems = defaultItems ? NAVI_FUNC_ITEMS : funcNavItems;
    const showSub = mode !== 'left';
    const showItems = mode !== 'logo';
    const containerClass = cs(s.container, {
        [s.logoOnly]: mode === 'logo',
        [s.leftMode]: mode === 'left',
    });
    const items = <>
        <div className={s.mainNav}>
            {
                mainItems.map(item => {
                    const { title } = item;
                    return <span key={title} onClick={() => btnClickHandler(item)}>{title}</span>;
                })
            }
        </div>
        {showSub && subItems && <div className={s.funcNav}>
            {
                subItems.map(item => {
                    const { title, url, type } = item;
                    const className = s[CLASS_TYPE_MAP[type]];
                    return <span key={title} className={className} onClick={() => funcBtnClickHandler(item)}>{title}</span>;
                })
            }
        </div>}
    </>;
    return (
        <div className={containerClass} style={{ background: transparent ? '' : bgColor }}>
            <Logo className={s.logo} size={'large'} />
            {withSearch && <FlexSearchBar />}
            {!!showItems && items}
        </div>
    );
};

export default (inject('store')(NavigationBar));
