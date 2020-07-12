import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import withStyles from 'isomorphic-style-loader/withStyles';
import Editor from './components/Editor';
// import ReactHtmlParser from 'react-html-parser';
import NavigationBar from './components/NavigationBar';
import Store from './store';
import s from './index.scss';
import LeftBar from './components/Uploader';

@withStyles(s)
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
        return (
            <div className={s.container}>
                <NavigationBar />
                <LeftBar />
                <Editor />
            </div>
        );
    }
}
