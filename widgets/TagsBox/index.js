import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function TagsBox (props) {
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

export default withStyles(s)(TagsBox);
