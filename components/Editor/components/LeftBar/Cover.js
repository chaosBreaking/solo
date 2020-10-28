import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Card from '@widgets/Card';
import Uploader from '../Uploader';
import { UPLOAD_COVER_API } from '../../constants';
import useStores from '@framework/util';

import s from './index.scss';

export default React.memo(function Cover(props) {
    useStyles(s);
    const { store } = useStores();
    const { uploader } = store;
    return <Card className={s.card}>
        <div className={s.title}>封面</div>
        <Uploader serverUrl={UPLOAD_COVER_API} uploader={uploader} prefix='covers/' />
    </Card>;
});
