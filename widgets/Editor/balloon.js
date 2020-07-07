import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import s from './index.scss';

const editorConfig = {
    language: {
        ui: 'zh-cn',
    },
    fontSize: {
        options: [
            'tiny',
            'small',
            'default',
            'big',
            'huge'
        ]
    }
};

export default withStyles(s)(function Editor (props) {
    return <CKEditor
        editor={BalloonEditor}
        data={props.data}
        config={editorConfig}
        onInit={editor => {
            props.mountEditorRef(editor);
        }}
        onChange={(event, editor) => {
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
    />;
});
