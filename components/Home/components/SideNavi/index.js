import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import { SIDE_NAVI_ITEMS } from '../../constants';
import s from './index.scss';

function SideNavi(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            {
                SIDE_NAVI_ITEMS.map(item => {
                    const { title, url } = item;
                    return <span key={title} className={s.item}>{title}</span>;
                })
            }
        </div>
    );
};

export default React.memo(SideNavi);
