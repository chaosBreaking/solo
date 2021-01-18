import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { observer } from 'mobx-react';
import BlockItem from '../BlockItem';
import useStores from '@framework/util';
import LoadingSVG from '@widgets/LoadingSVG';
import Sentinel from '@widgets/Sentinel';
import s from './index.scss';

export default observer(function FeedsList(props) {
    useStyles(s);
    const { store } = useStores();
    const { dataList, loadMore, loadingStatus } = store;

    return <div className={s.container}>
        <div className={s.list}>
            {
                dataList.map((item, index) => <BlockItem key={index} {...item} />)
            }
        </div>
        {
            loadingStatus
                ? loadingStatus === -1 ? <div style={{ color: '#666' }}>
                    🏁 没有更多咯 🏁
                </div>
                    : <LoadingSVG theme={'dark'} />
                : <Sentinel onShowAction={loadMore} />
        }
    </div>;
});
