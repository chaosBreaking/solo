import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import EntityBar from './widgets/EntityBar';
import ListCard from './widgets/ListCard';
import { RepoItem, TeamItem } from './widgets/Items';

@withStyles(s)
@inject('store')
@observer
export default class UserZone extends Component {
    get store () {
        return this.props.store;
    }

    componentDidMount () {
    }

    render () {
        const { repoList, loadMore, loadingStatus } = this.store;
        return (
            <div className={s.container}>
                <EntityBar />
                <ListCard title={'作品仓库'} placeholder={'搜索作品仓库...'} Item={RepoItem} data={repoList} loadMore={loadMore} loadingStatus={loadingStatus} />
                <ListCard title={'团队'} placeholder={'搜索团队...'} Item={TeamItem} data={repoList} loadMore={loadMore} loadingStatus={loadingStatus} />
            </div>
        );
    }
}
