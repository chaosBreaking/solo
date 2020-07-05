import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS } from '../../constants';
import s from './index.scss';

const SUB_ITEMS = ['科技', '赛博文化', '密码朋克', '媒体', '艺术'];

function NavigationBar (props) {
    const { subNav = SUB_ITEMS } = props;
    const naviToIndex = e => {
        forward('/index');
    };
    const itemForward = url => {
        forward(url);
    };
    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.logo} onClick={naviToIndex}><h1>Solo</h1></div>
                {
                    NAVI_ITEMS.map(item => {
                        const { title, url } = item;
                        return <span onClick={itemForward.bind(this, url)} key={title}>{title}</span>;
                    })
                }
            </div>
            <div className={s.subNav}>
                {
                    subNav.map(item => <span key={item}>{item}</span>)
                }
            </div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
