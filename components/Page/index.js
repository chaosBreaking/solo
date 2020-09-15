/**
 *  创作者主页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import NavigationBar from '@widgets/NavigationBar';
import Head from './components/Head';
import Main from './components/Main';

import s from './index.scss';

@withStyles(s)
@inject('store')
@pageWrapper({
    Store
})
@observer
export default class PersonalPage extends Component {
    render() {
        return (
            <div className={s.container}>
                {/* <NavigationBar defaultItems /> */}
                <div className={s.main}>
                    <Head />
                    <Main />
                </div>
            </div>
        );
    }
}
