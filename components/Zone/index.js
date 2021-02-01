import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import Recommend from './components/Recommend';
import FeedsList from './components/FeedsList';
import TopCard from './components/TopCard';
import SideNav from './components/SideNav';
import Header from './components/Header';
import { ACTIVE_VIEW } from './constants';
import s from './index.scss';

@withStyles(s)
@createPage({
    Store
})
@inject('store')
@observer
export default class Zone extends Component {
    getBody() {
        const { activeView } = this.props.store;
        switch (activeView) {
            case ACTIVE_VIEW.POST:
                return <>
                </>;
            case ACTIVE_VIEW.COMMUNITY:
                return <>
                </>;
            default:
                return <>
                    <TopCard />
                    <FeedsList />
                </>;
        }
    }

    componentDidMount() {
        if (!history.state?.activeView) {
            history.replaceState({
                activeView: this.props.store.activeView
            }, '', '');
        }
        window.addEventListener('popstate', () => {
            const { activeView } = history.state || {};
            this.props.store.setActiveView(activeView);
        });
    }

    render() {
        return (
            <div className={s.container}>
                <div className={s.main}>
                    <Header />
                    <SideNav />
                    <Recommend />
                    {
                        this.getBody()
                    }
                </div>
            </div>
        );
    }
}
