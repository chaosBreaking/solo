/**
 *  注册/登录页面
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import withStyles from 'isomorphic-style-loader/withStyles';
import Store from './store';
import NavigationBar from '@widgets/NavigationBar';
import ToastContainer from '@widgets/Toast';
import 'react-toastify/dist/ReactToastify.css';
import s from './index.scss';
import Card from '@widgets/Card';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class VerifyPage extends Component {
    componentDidMount () {
        // const
    }

    render () {
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
