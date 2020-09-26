import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Card from '@widgets/Card';
import useStores from '@framework/util';

import s from './index.scss';

export default function TagInput(props) {
    useStyles(s);
    const { store } = useStores();
    const { tags: tagsArray, setTags: updateTagsArray } = store;
    // const [tagsArray, updateTagsArray] = useState([]);
    const [currentTag, changeCurrentTag] = useState('');
    const addTag = () => {
        if (currentTag && !tagsArray.includes(currentTag.trim())) {
            updateTagsArray([...tagsArray, currentTag.trim()]);
        }
        changeCurrentTag('');
    };
    const deleteTag = target => {
        updateTagsArray(tagsArray.filter(tag => tag !== target));
    };
    return <Card className={s.card}>
        <div className={s.title}>标签</div>
        <div className={s.tagContainer}>
            {tagsArray.map((tag, index) => <span key={index} className={s.tag} onClick={e => deleteTag(tag)}>{tag}</span>)}
            <input type="text"
                className={s.tagInput}
                placeholder={'添加标签 +'}
                onChange={e => changeCurrentTag(e.target.value)}
                onBlur={addTag}
                onKeyDown={e => +e.keyCode === 13 && addTag()}
                value={currentTag}
            />
        </div>
    </Card>;
};
