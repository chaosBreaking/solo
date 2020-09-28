import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function TagsBox(props) {
    useStyles(s);
    const { tags } = props;
    return (
        <div className={s.container}>
            <div className={s.body}>
                {tags.map(tag => {
                    return <span key={tag} className={s.item}>{tag}</span>;
                })}
            </div>
        </div>
    );
};
