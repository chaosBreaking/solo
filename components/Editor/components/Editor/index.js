import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Editor from '@widgets/Editor';
import useStores from '@framework/util';
import { UPLOAD_IMG_API } from '../../constants';

import s from './index.scss';

export default observer(function EditorWrapper(props) {
    useStyles(s);
    const { store } = useStores();
    const { editorTitle, setEditorTitle, uploader, saveContent, onEditorInit } = store;
    const inputHandler = e => {
        setEditorTitle(e.target.value);
    };
    const keyboardSave = e => {
        if (e.keyCode === 83 && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            saveContent();
        }
    };
    const onMounted = editor => {
        onEditorInit(editor);
        const iframe = document.getElementsByClassName('tox-edit-area__iframe')[0].contentWindow;
        document.addEventListener('keydown', keyboardSave);
        iframe.addEventListener('keydown', keyboardSave);
    };

    return (
        <div className={s.editor}>
            <div className={s.titleInput}>
                <input className={s.title} type="text" placeholder="输入文章标题 ..." value={editorTitle} onChange={inputHandler} />
            </div>
            <Editor type={'classic'} {...props} uploadUrl={UPLOAD_IMG_API} uploader={uploader} onMounted={onMounted} />
        </div>
    );
});
