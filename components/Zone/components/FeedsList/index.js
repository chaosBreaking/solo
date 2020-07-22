import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import { inject } from 'mobx-react';
import BlockItem from '../BlockItem';

function FeedsList (props) {
    const { dataList } = props.store;
    return <div className={s.container}>
        {
            dataList.map((item, index) => <BlockItem key={index} index={index} />)
        }
    </div>;
};

export default withStyles(s)(inject('store')(FeedsList));
