/**
 *  文字内容编辑页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import withStyles from 'isomorphic-style-loader/withStyles';
import Editor from './components/Editor';
import NavigationBar from './components/NavigationBar';
import LeftBar from './components/LeftBar';
import ToastContainer from '@widgets/Toast';
import Store from './store';
import s from './index.scss';
import { LoginCard } from '@widgets/AuthCards';
import Mask from '@widgets/Mask';

@withStyles(s)
@createPage({
    Store
})
@inject('store')
@observer
export default class EditorPage extends Component {
    render() {
        const {
            editorContent,
            onEditorInit,
            saveContent,
            publishContent,
            handleEditorChange,
            handleLoginSubmit,
            showLoginCard,
            switchLoginCard,
        } = this.props.store;
        return (
            <div className={s.container}>
                <NavigationBar saveContent={saveContent} publishContent={publishContent} />
                <LeftBar />
                <Editor onInit={onEditorInit} content={editorContent} handleEditorChange={handleEditorChange} />
                <ToastContainer limit={1} pauseOnFocusLoss={false} />
                {
                    showLoginCard && <div className={s.authModal} onClick={() => switchLoginCard(false)}>
                        <Mask zIndex={0} />
                        <LoginCard handleSubmit={handleLoginSubmit} />
                    </div>
                }
            </div>
        );
    }
}
