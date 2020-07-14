import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Editor from '@widgets/Editor';
import s from './index.scss';

function EditorWrapper (props) {
    return (
        <div className={s.editor}>
            <div className={s.titleInput}>
                <input className={s.title} type="text" placeholder="输入文章标题 ..." />
            </div>
            <Editor type={'classic'} />
        </div>
    );
};

export default withStyles(s)(EditorWrapper);
