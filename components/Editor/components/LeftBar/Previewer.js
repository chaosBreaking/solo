import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Card from '@widgets/Card';
import s from './index.scss';

function Previewer (props) {
    return <Card className={s.card}>
        <div className={s.title}>预览</div>
    </Card>;
};

export default withStyles(s)(Previewer);
