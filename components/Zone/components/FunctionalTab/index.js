import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';

import s from './index.scss';
import useStores from '@framework/util';

export default (React.memo(function FunctionalTab(props) {
    useStyles(s);
    const { store } = useStores();
    const { mainTabs, activeTab, setActiveTab } = store;
    const clickHandler = (e, id) => {
        e.stopPropagation();
        setActiveTab(+id);
    };
    return (
        <div className={s.container}>
        </div>
    );
}));
