import React from 'react';
import { observer, inject } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';

import s from './index.scss';

function MainTab(props) {
    useStyles(s);
    const { store } = props;
    const { mainTabs, activeTab, setActiveTab } = store;
    const clickHandler = (e, id) => {
        e.stopPropagation();
        setActiveTab(+id);
    };
    return (
        <div className={s.container}>
            {
                mainTabs.map((item, idx) => {
                    const { title, id } = item;
                    return <span key={idx} className={cs(s.item, {
                        [s.active]: activeTab === +id,
                    })} onClick={e => clickHandler(e, id)}>{title}</span>;
                })
            }
        </div>
    );
};

export default inject('store')(observer(MainTab));
