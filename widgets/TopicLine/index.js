import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function TopicLine (props) {
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

export default withStyles(s)(TopicLine);
