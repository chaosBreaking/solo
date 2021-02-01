import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { observer, inject } from 'mobx-react';
import cs from 'classnames';
// import { SIDE_NAVI_ITEMS } from '../../constants'; // 兜底
import s from './index.scss';

function SubTab(props) {
    useStyles(s);
    const { store } = props;
    const { subTabs, activeSubTab, setSubActiveTab } = store;
    const clickHandler = (e, id) => {
        e && e.stopPropagation();
        activeSubTab !== id && setSubActiveTab(id);
    };
    return (
        <div className={s.container}>
            {
                subTabs.map((item, idx) => {
                    const { title, id } = item;
                    return <span
                        key={idx}
                        className={cs(s.item, {
                            [s.active]: activeSubTab === +id,
                        })}
                        onClick={e => clickHandler(e, +id)}
                    >
                        {title}
                    </span>;
                })
            }
        </div>
    );
};

export default inject('store')(observer(SubTab));
