import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS } from '../../constants';
import s from './index.scss';

const SubNav = ['科技', 'Hacker', '文学', '音乐', '建筑', '公共事物', '旅行'];

function NavigationBar (props) {
    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                {/* <div className={s.logo} onClick={naviToIndex}><h1>Solo</h1></div> */}
                {
                    NAVI_ITEMS.map(item => {
                        const { title, url } = item;
                        return <span key={title}>{title}</span>;
                    })
                }
            </div>
            <div className={s.subNav}>
                {
                    SubNav.map(item => <span key={item}>{item}</span>)
                }
            </div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
