import React from 'react';
import { inject, observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import cs from 'classnames';
import s from './index.scss';

const Block = ({ children }) => <div className={s.block}>{children}</div>;

function GuideCard(props) {
    useStyles(s);

    return (
        <div className={s.container}>
            <div className={s.title}>
                <span>创作者指南</span>
            </div>
            <div className={s.body}>

            </div>
        </div >
    );
};

export default observer(GuideCard);
