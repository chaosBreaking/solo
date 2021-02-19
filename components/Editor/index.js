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
import store from './store';
import s from './index.scss';
import { LoginCard } from '@components/Common/AuthCards';
import Mask from '@widgets/Mask';

@withStyles(s)
@createPage(
    { store },
    {
        pageInfo: {
            title: 'Solo|编辑器'
        }
    }
)
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
                <ToastContainer autoClose={3000} hideProgressBar limit={1} pauseOnFocusLoss={false} closeOnClick />
                {
                    showLoginCard && <div className={s.authModal}>
                        <Mask zIndex={0} onClick={() => switchLoginCard(false)} />
                        <LoginCard handleSubmit={handleLoginSubmit} />
                    </div>
                }
            </div>
        );
    }
}
