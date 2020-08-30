import React from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS, NAVI_FUNC_ITEMS, NAVI_ITEM_TYPE } from '../../constants';
import s from './index.scss';

const CLASS_TYPE_MAP = {
    1: 'navItem',
    2: 'collection',
    3: 'button',
    4: 'special',
};

const btnClickHandler = item => {
    const { type, url } = item || {};
    if (type === NAVI_ITEM_TYPE.LINK) {
        forward(url);
    }
};

function NavigationBar ({ store }) {
    const funcBtnClickHandler = item => {
        const { type } = item || {};
        if (type === NAVI_ITEM_TYPE.BUTTON) {
            store.switchLoginCard(true);
        }
        if (type === NAVI_ITEM_TYPE.LINK || type === NAVI_ITEM_TYPE.SPECIAL) {
            forward(item.url);
        }
    };
    return (
        <div className={s.container}>
            <div className={s.logo}><h1>eqbator</h1></div>
            <div className={s.mainNav}>
                {
                    NAVI_ITEMS.map(item => {
                        const { title } = item;
                        return <span key={title} onClick={() => btnClickHandler(item)}>{title}</span>;
                    })
                }
            </div>
            <div className={s.funcNav}>
                {
                    NAVI_FUNC_ITEMS.map(item => {
                        const { title, url, type } = item;
                        const className = s[CLASS_TYPE_MAP[type]];
                        return <span key={title} className={className} onClick={() => funcBtnClickHandler(item)}>{title}</span>;
                    })
                }
            </div>
        </div>
    );
};

export default withStyles(s)(inject('store')(NavigationBar));
