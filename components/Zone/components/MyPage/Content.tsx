import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import FeedsList from '../FeedsList';
import BlockItem from '../BlockItem';
import CommunityCard from '../CommunityCard';
import PostsCard from '../PostsCard';
import store from '../../store';

import s from './content.scss';

@withStyles(s)
@inject('store')
@observer
export default class Zone extends Component<{ store?: store }> {
    renderArticles() {
        const {
            loadMyPageData,
            myPageArticle,
            myPageLoadingStatus,
            serverTime,
        } = this.props.store;
        const renderItems = (item: any) => {
            return <BlockItem key={item._id} {...item} serverTime={serverTime} />;
        };
        return <FeedsList
            uniqueKey={'articleList'}
            key={'articleList'}
            dataList={myPageArticle}
            loadMore={loadMyPageData}
            loadingStatus={myPageLoadingStatus}
            renderItems={renderItems}
            style={{ background: '#fefefe' }}
        />;
    }

    renderPosts() {
        const {
            myPagePost,
            loadMyPageData,
            myPageLoadingStatus,
        } = this.props.store;
        const renderItems = (item: any) => {
            return <PostsCard key={item._id} data={item} />;
        };
        return <FeedsList
            uniqueKey={'postList'}
            key={'postList'}
            dataList={myPagePost}
            loadMore={loadMyPageData}
            loadingStatus={myPageLoadingStatus}
            renderItems={renderItems}
            noBorder
        />;
    }

    renderCommunity() {
        const {
            myPageCommunity,
            loadMyPageData,
            myPageLoadingStatus,
        } = this.props.store;
        const renderItems = (item: any) => {
            return <CommunityCard key={item._id} {...item} />;
        };
        return <FeedsList
            uniqueKey={'communityList'}
            key={'communityList'}
            direction={'row'}
            dataList={myPageCommunity}
            loadMore={loadMyPageData}
            loadingStatus={myPageLoadingStatus}
            renderItems={renderItems}
            noBorder
        />;
    }

    getBody() {
        const { activeTab } = this.props.store;
        switch (activeTab) {
            case 1:
                return this.renderPosts();
            case 2:
                return this.renderCommunity();
            default:
                return this.renderArticles();
        }
    }

    render() {
        return (
            <div className={s.container}>
                {
                    this.getBody()
                }
            </div>
        );
    }
}
