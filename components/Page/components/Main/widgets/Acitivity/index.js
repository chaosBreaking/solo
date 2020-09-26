import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { inject, observer } from 'mobx-react';
import Card from '@widgets/Card';

import s from './index.scss';

const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;

function Acitivity(props) {
    useStyles(s);
    return (
        <div className={s.container}>
        </div>
    );
};

export default inject('store')(observer(Acitivity));
