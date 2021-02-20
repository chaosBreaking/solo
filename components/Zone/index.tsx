import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import ExtendZone from './components/ExtendZone';
import FeedsList from './components/FeedsList';
import TopCard from './components/TopCard';
import SideNav from './components/SideNav';
import Header from './components/Header';
import { ACTIVE_VIEW } from '@constants/ui';
import BlockItem from './components/BlockItem';
import CommunityCard from './components/CommunityCard';
import PostsCard from './components/PostsCard';
import ToastContainer from '@widgets/Toast';
import userStore from '@framework/UserStore';
import loadable from '@loadable/component';

import s from './index.scss';

@withStyles(s)
@createPage({
    store,
    userStore,
}, {
    pageInfo: {
        title: 'Solo | 探索'
    }
})
@inject('store')
@observer
export default class Zone extends Component<{ store: store }> {
    renderArticles() {
        const {
            loadMore,
            articleList,
            loadingStatus,
            serverTime,
        } = this.props.store;
        const renderItems = (item: any) => {
            return <BlockItem key={item._id} {...item} serverTime={serverTime} />;
        };
        return <>
            <TopCard />
            <FeedsList
                dataList={articleList}
                loadMore={loadMore}
                loadingStatus={loadingStatus}
                renderItems={renderItems}
                style={{ background: '#fefefe' }}
            />
        </>;
    }

    renderPosts() {
        const {
            postList,
            loadMore,
            loadingStatus,
        } = this.props.store;
        const CommentPannel = loadable(() => import('./components/CommentPannel'));
        const renderItems = (item: any) => {
            return <PostsCard key={item._id} data={item} CommentPannel={CommentPannel} />;
        };
        return <FeedsList
            dataList={postList}
            loadMore={loadMore}
            loadingStatus={loadingStatus}
            renderItems={renderItems}
            showNoMoreTip={false}
            noBorder
        />;
    }

    renderCommunity() {
        const renderItems = (item: any) => {
            return <CommunityCard key={item._id} {...item} />;
        };
        const {
            communityList,
            loadMore,
            loadingStatus,
        } = this.props.store;
        return <FeedsList
            direction={'row'}
            dataList={communityList}
            loadMore={loadMore}
            loadingStatus={loadingStatus}
            renderItems={renderItems}
            showNoMoreTip={false}
            noBorder
        />;
    }

    getBody() {
        const { activeView } = this.props.store;
        switch (activeView) {
            case ACTIVE_VIEW.POST.index:
                return this.renderPosts();
            case ACTIVE_VIEW.COMMUNITY.index:
                return this.renderCommunity();
            default:
                return this.renderArticles();
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
                    <ExtendZone />
                    {
                        this.getBody()
                    }
                </div>
                <ToastContainer />
            </div>
        );
    }
}
