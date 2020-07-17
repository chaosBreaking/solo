import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Card from '@widgets/Card';
import Uploader from '../Uploader';
import s from './index.scss';

function Cover (props) {
    return <Card className={s.card}>
        <div className={s.title}>封面</div>
        <Uploader />
    </Card>;
};

export default withStyles(s)(Cover);
