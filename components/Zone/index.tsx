import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import Store from './store';
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
import s from './index.scss';
import ToastContainer from '@widgets/Toast';

@withStyles(s)
@createPage({
    Store,
    pageInfo: {
        title: 'Solo | 探索'
    }
})
@inject('store')
@observer
export default class Zone extends Component<{ store: Store }> {
    renderArticles() {
        const renderItems = (item: any) => {
            return <BlockItem key={item._id} {...item} />;
        };
        const {
            loadMore,
            articleList,
            loadingStatus,
        } = this.props.store;
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
        const renderItems = (item: any) => {
            return <PostsCard key={item._id} {...item} />;
        };
        const {
            postList,
            loadMore,
            loadingStatus,
        } = this.props.store;
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
