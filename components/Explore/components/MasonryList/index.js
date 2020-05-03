import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import PostsCard from '../PostsCard';

@withStyles(s)
@inject('store')
@observer
export default class MasonryList extends Component {
    componentDidMount () {
    }

    calList () {
        const list = [[], [], []];
        this.props.list.map((item, index) => {
            list[index % 3].push(item);
        });
        return list;
    }

    render () {
        // const { list } = this.props;
        return (
            <div className={s.container}>
                {
                    this.calList().map((list, index) => {
                        return <div key={index} className={s.column}>
                            {list.map((item, index) => {
                                return <PostsCard key={index} data={item} index={index} />;
                            })}
                        </div>;
                    })
                }
            </div>
        );
    }
}
