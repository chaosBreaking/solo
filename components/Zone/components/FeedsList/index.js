import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';
import { inject } from 'mobx-react';
import BlockItem from '../BlockItem';

function FeedsList(props) {
    useStyles(s);
    const { dataList } = props.store;
    return <div className={s.container}>
        {
            dataList.map((item, index) => <BlockItem key={index} index={index} />)
        }
    </div>;
};

export default inject('store')(FeedsList);
