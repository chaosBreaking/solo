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
        /**
         * 三排瀑布流，如何分配item
         * 前提共识：待安排的items中，任意两个item的高度差不会大于items中任意一个item的高度，所以每次插入新的内容的列表，都会被默认为最高的。
         * 假设三个子列表A、B、C和沉默项disabled。
         * 1. 在初始状态时，三列表高度一样，选择默认A，将第一个item放入A中，之后A标记为沉默项。
         * 2. 在排除沉默项后的其余两个列表里进行二选一比较，选高度最小的，作为此次插入的容器，插入后将该列表标记为沉默项disabled。
         * 3. 重复步骤2，直到安排完毕所有项目。
         */
        const list = [[], [], []];
        this.props.list.map((item, index) => {
            list[index % 3].push(item);
        });
        return list;
    }

    render () {
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
