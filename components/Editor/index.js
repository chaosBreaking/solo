/**
 *  文字内容编辑页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import withStyles from 'isomorphic-style-loader/withStyles';
import Editor from './components/Editor';
import NavigationBar from './components/NavigationBar';
import LeftBar from './components/LeftBar';
import Store from './store';
import s from './index.scss';
import ToastContainer from '@widgets/Toast';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class EditorPage extends Component {
    render() {
        const { editorContent, onEditorInit, saveContent, publishContent, handleEditorChange } = this.props.store;
        return (
            <div className={s.container}>
                <NavigationBar saveContent={saveContent} publishContent={publishContent} />
                <LeftBar />
                <Editor onInit={onEditorInit} content={editorContent} handleEditorChange={handleEditorChange} />
                <ToastContainer limit={1} pauseOnFocusLoss={false} />
            </div>
        );
    }
}
