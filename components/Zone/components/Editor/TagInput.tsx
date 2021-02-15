import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Tooltip from '@material-ui/core/Tooltip';

import s from './tags.scss';

export default observer(function TagInput({ tags, setTags }) {
    useStyles(s);
    const [currentTag, changeCurrentTag] = useState('');
    const addTag = () => {
        if (currentTag && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
        }
        changeCurrentTag('');
    };
    const deleteTag = target => {
        setTags(tags.filter(tag => tag !== target));
    };
    return <div className={s.tagContainer}>
        {
            tags.map((tag, index) => <Tooltip key={index} title={'点击删除'} arrow placement="top-start">
                <span key={index} className={s.tag} onClick={e => deleteTag(tag)}>{tag}</span>
            </Tooltip>)
        }
        <input type="text"
            className={s.tagInput}
            placeholder={'输入标签'}
            onChange={e => changeCurrentTag(e.target.value)}
            onBlur={addTag}
            onKeyDown={e => +e.keyCode === 13 && addTag()}
            value={currentTag}
        />
    </div>;
});
