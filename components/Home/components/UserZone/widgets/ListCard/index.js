import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

@withStyles(s)
@inject('store')
@observer
export default class ListCard extends Component {
    renderItem = (data, idx) => {
        const { Item } = this.props;
        return <Item data={data} idx={idx} key={idx} />;
    }

    render () {
        const { data, title, loadMore } = this.props;
        return (
            <div className={s.container}>
                <div className={s.top}>
                    <div className={s.title}>{title}</div>
                </div>
                <div className={s.main}>
                    {
                        data.map(this.renderItem)
                    }
                </div>
                <div className={s.more} onClick={loadMore}>展开更多...</div>
            </div>
        );
    }
}
