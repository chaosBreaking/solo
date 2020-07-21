import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import { inject } from 'mobx-react';
import BlockItem from '../BlockItem';

function FeedsList (props) {
    const { dataList } = props.store;
    return <div className={s.container}>
        <div className={s.fullscreen}>
            {
                dataList.slice(0, 5).map((item, index) => {
                    return <BlockItem key={index} index={index} />;
                })
            }
        </div>
        <div className={s.narrow}>
            {
                dataList.map((item, index) => {
                    if (index < 5) return null;
                    return <BlockItem key={index} index={index} />;
                })
            }
        </div>
    </div>;
};

export default withStyles(s)(inject('store')(FeedsList));
