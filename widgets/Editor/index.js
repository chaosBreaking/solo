import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@withStyles(s)
export default class Editor extends Component {
    state = { show: false };
    componentDidMount () {
        this.setState({ show: true });
    }

    render () {
        if (!this.state.show) return null;
        return (
            <div className={s.editor}>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                        this.props.mountEditorRef(editor);
                    }}
                    onChange={(event, editor) => {
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                />
            </div>
        );
    }
}
