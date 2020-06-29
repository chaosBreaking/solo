import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import ActivityItem from './widgets/ActivityItem';
import s from './index.scss';
import InfiniteLoader from '@widgets/InfiniteLoader';

@withStyles(s)
@inject('store')
@observer
export default class Timeline extends Component {
    get store () {
        return this.props.store;
    }

    render () {
        const { timeline, loadMoreActivity, loadingActivityStatus } = this.store;
        const loadOptions = {
            status: loadingActivityStatus,
            onShowAction: loadMoreActivity,
            loaddedAllTip: '已经展示所有动态'
        };
        return (
            <div className={s.container}>
                <div className={s.main}>
                    {
                        timeline.map((item, idx) => <ActivityItem data={item} key={idx} />)
                    }
                </div>
                <InfiniteLoader {...loadOptions} />
            </div>
        );
    }
}
