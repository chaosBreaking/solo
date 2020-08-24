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

@withStyles(s)
@inject('store')
@pageWrapper({
    Store
})
@observer
export default class EditorPage extends Component {
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
