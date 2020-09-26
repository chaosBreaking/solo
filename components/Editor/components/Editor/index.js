import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Editor from '@widgets/Editor';
import s from './index.scss';
import useStores from '@framework/util';

function EditorWrapper(props) {
    useStyles(s);
    const { store } = useStores();
    const { editorTitle, setEditorTitle } = store;
    const inputHandler = e => {
        setEditorTitle(e.target.value);
    };

    return (
        <div className={s.editor}>
            <div className={s.titleInput}>
                <input className={s.title} type="text" placeholder="输入文章标题 ..." value={editorTitle} onChange={inputHandler} />
            </div>
            <Editor type={'classic'} {...props} />
        </div>
    );
};

export default observer(EditorWrapper);
