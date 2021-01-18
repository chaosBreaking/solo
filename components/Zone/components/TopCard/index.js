import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Carousel from '../Carousel';
import s from './index.scss';

export default function TopCard(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <Carousel data={{ title: 'xxx' }} />
        </div >
    );
};
