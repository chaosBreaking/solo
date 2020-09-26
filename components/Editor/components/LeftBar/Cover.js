import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Card from '@widgets/Card';
import Uploader from '../Uploader';
import { UPLOAD_API } from '../../constants';

import s from './index.scss';

function Cover(props) {
    useStyles(s);
    return <Card className={s.card}>
        <div className={s.title}>封面</div>
        <Uploader serverUrl={UPLOAD_API} />
    </Card>;
};

export default Cover;
