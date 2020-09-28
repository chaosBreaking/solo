import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function TopicLine(props) {
    useStyles(s);
    const { data = [] } = props;
    const list = Object.prototype.toString.call(data) === '[object Array]'
        ? data
        : [data];
    return (
        <div className={s.container}>
            {
                list.map((item = {}, index) => {
                    const { title } = item;
                    return (
                        <div className={s.item} key={title + index}>
                            <span className={s.title}>{title}</span>
                        </div>
                    );
                })
            }
        </div>
    );
};
