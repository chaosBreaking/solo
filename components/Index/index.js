import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import AuthCard from './components/AuthCard';
import s from './index.scss';

const BG_IMAGES = [
    'http://solo-app.test.upcdn.net/home_bg-13mk9v-progressive.jpeg',
    'http://solo-app.test.upcdn.net/home_bg_xj3haef-progressive.jpeg',
    'http://solo-app.test.upcdn.net/wallhaven-96w8e8.jpeg'
];

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Home extends Component {
    render () {
        return (
            <div className={s.container}>
                <div className={s.banner}>
                    <span className={s.bottomInfo}>Solo是什么?</span>
                </div>
                <div className={s.home} style={{ backgroundImage: `url(${BG_IMAGES[~~(Math.random() * 10) % 3]})` }}>
                    <AuthCard />
                </div>
            </div>
        );
    }
}
