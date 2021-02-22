import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import { SIDE_NAVI_ITEMS } from '../../constants';
import cs from 'classnames';
import s from './index.scss';

function SideNavi(props) {
    useStyles(s);
    const active = 0;
    const handleClick = item => {
        const { url } = item;
        url && forward(url);
    };
    return (
        <div className={s.container}>
            {
                SIDE_NAVI_ITEMS.map((item, index) => {
                    const { title } = item;
                    return <div
                        key={title}
                        className={cs(s.item, {
                            [s.active]: active === index,
                        })}
                        onClick={() => handleClick(item)}
                    >
                        <span className={'iconfont icon-geren'} />
                        <span>{title}</span>
                    </div>;
                })
            }
            <div className={s.prime}>
                Prime会员
            </div>
        </div>
    );
};

export default observer(SideNavi);
