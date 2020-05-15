import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import s from './index.scss';
import Editor from '@widgets/Editor';
import ReactHtmlParser from 'react-html-parser';

@inject('store')
@pageWrapper({
    Store
})
@observer
export default class Test extends Component {
    state = {
        content: '',
        show: false
    }

    componentDidMount () {
        this.setState({ show: true });
    }

    submit = () => {
        const data = this.editor.getData();
        this.setState({ content: data });
    }

    render () {
        const mountEditorRef = editor => {
            this.editor = editor;
        };
        return (
            <div className={s.container}>
                <div className={s.content}>{ ReactHtmlParser(this.state.content) }</div>
                <div onClick={this.submit}>xxxx</div>
                <Editor id={'editor'} mountEditorRef={mountEditorRef} />
            </div>
        );
    }
}
