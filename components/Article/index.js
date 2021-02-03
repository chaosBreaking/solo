/**
 *  文章详情页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import withStyles from 'isomorphic-style-loader/withStyles';
import Store from './store';
import ToastContainer from '@widgets/Toast';
import Content from './components/Content';
import ScrollTop from '@widgets/ScrollTop';
import s from './index.scss';

@withStyles(s)
@createPage({
    Store
})
@inject('store')
@observer
export default class ArticlePage extends Component {
    render() {
        return (
            <div className={s.container}>
                <Content />
                <ScrollTop background={'f2f2f2'} />
                <ToastContainer limit={1} pauseOnFocusLoss={false} />
            </div>
        );
    }
}
