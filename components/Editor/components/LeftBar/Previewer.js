import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Card from '@widgets/Card';
import s from './index.scss';

function Previewer(props) {
    useStyles(s);
    return <Card className={s.card}>
        <div className={s.title}>预览</div>
    </Card>;
};

export default Previewer;
