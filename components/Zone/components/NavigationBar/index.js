import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS } from '../../constants';
import s from './index.scss';
import Avatar from '@widgets/Avatar';

export default React.memo(function NavigationBar(props) {
    useStyles(s);
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
});
