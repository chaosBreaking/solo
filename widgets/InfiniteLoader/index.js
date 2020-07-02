import React, { useState } from 'react';
import Sentinel from '@widgets/Sentinel';
import LoadingSVG from '@widgets/LoadingSVG';

const STATUS_MAP = {
    ERROR: -1,
    READY: 0,
    LOADING: 1,
    LOADDED_ALL: 2,
};

export default function InfiniteLoader (props) {
    const { status, onShowAction, once = false, loaddedAllTip = '我可是有底线的', theme } = props;
    switch (status) {
    case STATUS_MAP.READY:
        return <Sentinel onShowAction={onShowAction} once={once} />;
    case STATUS_MAP.LOADING:
        return <LoadingSVG theme={theme} />;
    default: return <div>{loaddedAllTip}</div>;
    }
}
