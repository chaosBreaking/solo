/**
 *  账号邮件验证页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import withStyles from 'isomorphic-style-loader/withStyles';
import store from './store';
import NavigationBar from '@widgets/NavigationBar';
import ToastContainer from '@widgets/Toast';
import 'react-toastify/dist/ReactToastify.css';
import s from './index.scss';
import Card from '@widgets/Card';

@withStyles(s)
@createPage({
    store
})
@inject('store')
@observer
export default class VerifyPage extends Component {
    componentDidMount() {
        // const
    }

    render() {
        return (
            <div className={s.container}>
                <NavigationBar defaultItems mode={'left'} />
                <div className={s.body}>
                    <Card>

                    </Card>
                </div>
                <ToastContainer limit={1} pauseOnFocusLoss={false} />
            </div>
        );
    }
}
