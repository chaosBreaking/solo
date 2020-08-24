/**
 *  注册/登录页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import withStyles from 'isomorphic-style-loader/withStyles';
import Store from './store';
import NavigationBar from '@widgets/NavigationBar';
import s from './index.scss';
import MultiForm from './components/MultiForm';
import ToastContainer from '@widgets/Toast';
// import 'react-toastify/dist/ReactToastify.css';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class AuthPage extends Component {
    render () {
        return (
            <div className={s.container}>
                <NavigationBar defaultItems mode={'left'} />
                <MultiForm />
                <ToastContainer limit={1} pauseOnFocusLoss={false} />
            </div>
        );
    }
}
