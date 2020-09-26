import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { inject, observer } from 'mobx-react';

import s from './index.scss';
import Card from '@widgets/Card';

const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;

function Repo(props) {
    useStyles(s);
    return (
        <div className={s.container}>

        </div>
    );
};

export default inject('store')(observer(Repo));
