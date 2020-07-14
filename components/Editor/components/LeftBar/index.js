import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import Card from '@widgets/Card';
import Uploader from '../Uploader';
import s from './index.scss';

function LeftBar (props) {
    return (
        <div className={s.container}>
            <Card className={s.card}>
                <div className={s.title}>预览</div>
            </Card>
            <Card className={s.card}>
                <div className={s.title}>封面</div>
                <Uploader />
            </Card>
            <Card className={s.card}>
                <div className={s.title}>序言</div>
            </Card>
            <Card className={s.card}>
                <div className={s.title}>#标签</div>
            </Card>
        </div>
    );
};

export default withStyles(s)(LeftBar);
