import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import Editor from '@widgets/Editor';
import ReactHtmlParser from 'react-html-parser';
import s from './index.scss';

@inject('store')
@pageWrapper({
    Store
})
@observer
export default class EditorPage extends Component {
    state = {
        type: 'classic',
        content: '',
        show: false,
    }

    componentDidMount () {
        this.setState({ show: true });
    }

    componentWillUnmount () {
        this.editor && this.editor.destory();
    }

    submit = () => {
        const data = this.editor.getData();
        this.setState({
            content: data,
        });
    }

    render () {
        const mountEditorRef = editor => {
            this.editor = editor;
        };
        const editorConfig = {
            language: 'zh',
        };
        return (
            <div className={s.container}>
                <div className={s.content}>{ ReactHtmlParser(this.state.content) }</div>
                <div onClick={this.submit}>提交</div>
                <div className={s.editor}>
                    <Editor type={'classic'} mountEditorRef={mountEditorRef} config={editorConfig} />
                </div>
            </div>
        );
    }
}
