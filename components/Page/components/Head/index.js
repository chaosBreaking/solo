import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Emage from '@widgets/Emage';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

function Head(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.cover}>
                <Emage className={s.img} isFake />
                <Avatar className={s.avatar} isFake size={'extra'} />
            </div>
        </div>
    );
};

export default Head;
