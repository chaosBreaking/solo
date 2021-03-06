/**
 *  注册/登录页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import withStyles from 'isomorphic-style-loader/withStyles';
import store from './store';
import s from './index.scss';
import MultiForm from './components/MultiForm';
import ToastContainer from '@widgets/Toast';
// import 'react-toastify/dist/ReactToastify.css';

@withStyles(s)
@createPage({ store }, {
    pageInfo: {
        title: 'Solo | 登录'
    }
})
@inject('store')
@observer
export default class AuthPage extends Component {
    render() {
        return (
            <div className={s.container}>
                <MultiForm />
                <ToastContainer limit={1} pauseOnFocusLoss={false} />
            </div>
        );
    }
}
