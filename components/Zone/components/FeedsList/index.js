import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { observer } from 'mobx-react';
import LoadingSVG from '@widgets/LoadingSVG';
import Sentinel from '@widgets/Sentinel';
import cs from 'classnames';
import s from './index.scss';

export default observer(function FeedsList({
    dataList,
    renderItems,
    loadMore,
    loadingStatus,
    direction = 'column',
    showNoMoreTip = true,
    style = {},
    noBorder = false,
    uniqueKey,
}) {
    useStyles(s);
    if (!dataList.length && loadingStatus === -1) {
        return <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>
            <span className="iconfont icon-shimodumeiyou" style={{ fontSize: '1rem' }} />
            <p style={{ color: '#666' }}>Oops~ 这里什么都没有哦</p>
        </div>;
    }

    return <div className={s.container}>
        <div
            key={uniqueKey}
            className={cs(s.list,
                {
                    [s.border]: !noBorder
                },
                direction === 'column' ? s.column : s.row)}
            style={style}>
            {
                dataList.map((item, index) => renderItems(item, index))
            }
        </div>
        {
            loadingStatus
                ? loadingStatus === -1
                    ? showNoMoreTip
                        ? <div style={{ color: '#666' }}>
                            🏁 没有更多咯 🏁
                        </div>
                        : null
                    : <LoadingSVG theme={'dark'} />
                : <Sentinel onShowAction={loadMore} />
        }
    </div>;
});
