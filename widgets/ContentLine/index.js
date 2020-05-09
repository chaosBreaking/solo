import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function ContentLine (props) {
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

export default withStyles(s)(ContentLine);
