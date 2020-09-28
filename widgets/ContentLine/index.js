import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function ContentLine(props) {
    useStyles(s);
    const { data = [] } = props;
    const list = Object.prototype.toString.call(data) === '[object Array]'
        ? data
        : [data];
    return (
        <div className={s.container}>
            {
                list.map((item = {}, index) => {
                    const { img, title, author, abstract } = item;
                    const backgroundImage = `url(${img})`;
                    return (
                        <div className={s.item} key={author + index}>
                            <div className={s.img} style={{ backgroundImage }} />
                            <div className={s.info}>
                                <span className={s.title}>{title}</span>
                                <span className={s.abstract}>{abstract}</span>
                                <span className={s.author}>{author}</span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};
