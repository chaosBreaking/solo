import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import { ACTIVE_VIEW } from '@constants/ui';
import ExtendZone from './components/ExtendZone';
import FeedsList from './components/FeedsList';
// import TopCard from './components/TopCard';
import SideNav from './components/SideNav';
import Header from './components/Header';
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
            return <BlockItem key={ACTIVE_VIEW.ARTICLE.index + item._id} {...item} serverTime={serverTime} />;
        };
        return <>
            {/* <TopCard /> */}
            <FeedsList
                uniqueKey={ACTIVE_VIEW.ARTICLE.index}
                key={ACTIVE_VIEW.ARTICLE.index}
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
            return <PostsCard key={ACTIVE_VIEW.POST.index + item._id} data={item} CommentPannel={CommentPannel} />;
        };
        return <FeedsList
            uniqueKey={ACTIVE_VIEW.POST.index}
            key={ACTIVE_VIEW.POST.index}
            dataList={postList}
            loadMore={loadMore}
            loadingStatus={loadingStatus}
            renderItems={renderItems}
            // showNoMoreTip={false}
            noBorder
        />;
    }

    renderCommunity() {
        const renderItems = (item: any) => {
            return <CommunityCard key={ACTIVE_VIEW.COMMUNITY.index + item._id} {...item} />;
        };
        const {
            communityList,
            loadMore,
            loadingStatus,
        } = this.props.store;
        return <FeedsList
            uniqueKey={ACTIVE_VIEW.COMMUNITY.index}
            key={ACTIVE_VIEW.COMMUNITY.index}
            direction={'row'}
            dataList={communityList}
            loadMore={loadMore}
            loadingStatus={loadingStatus}
            renderItems={renderItems}
            // showNoMoreTip={false}
            noBorder
        />;
    }

    renderMyPage() {
        const MyPage = loadable(() => import('./components/MyPage'));
        return <MyPage key={this.props.store.targetUid} />
    }

    renderUserPage() {
        const MyPage = loadable(() => import('./components/MyPage'));
        return <MyPage key={this.props.store.targetUid} />
    }

    getBody() {
        const { activeView } = this.props.store;
        switch (activeView) {
            case ACTIVE_VIEW.ARTICLE.index:
                return this.renderArticles();
            case ACTIVE_VIEW.POST.index:
                return this.renderPosts();
            case ACTIVE_VIEW.COMMUNITY.index:
                return this.renderCommunity();
            case ACTIVE_VIEW.ME.index:
                return this.renderMyPage();
            case ACTIVE_VIEW.USER.index:
                return this.renderUserPage();
            default:
                return null;
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
