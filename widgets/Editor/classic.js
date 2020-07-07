import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
import s from './index.scss';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
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
    },
    plugins: [
        SimpleUploadAdapter
    ],
    simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: 'http://example.com',

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
            'X-CSRF-TOKEN': 'CSFR-Token',
            Authorization: 'Bearer <JSON Web Token>'
        }
    }
};

export default withStyles(s)(function Editor (props) {
    return <CKEditor
        editor={ClassicEditor}
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
