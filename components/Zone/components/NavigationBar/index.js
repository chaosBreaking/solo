import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS } from '../../constants';
import s from './index.scss';
import Avatar from '@widgets/Avatar';

function NavigationBar (props) {
    return (
        <div className={s.container}>
            <div className={s.logo}>Solo</div>
            <div className={s.mainNav}>
                {
                    NAVI_ITEMS.map(item => {
                        const { title, url } = item;
                        return <span key={title}>{title}</span>;
                    })
                }
            </div>
            <div className={s.user}>
                <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'normal'} />
            </div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
