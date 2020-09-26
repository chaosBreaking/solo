import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Loadable from 'react-loadable';
import LoadingRipple from '@widgets/LoadingRipple';
import s from './index.scss';

const loadingStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const LoadingUI = props => props?.error
    ? <div>Error! <button onClick={props.retry}>Retry</button></div>
    : <div style={loadingStyles}><LoadingRipple size={'normal'} /><br /><h1>加载中...</h1></div>;

const LoadableUploader = Loadable({
    loader: () => import('./uploader'),
    loading: LoadingUI,
    delay: 200,
    timeout: 10000,
});

function Uploader({ serverUrl }) {
    useStyles(s);
    return (
        <div className={s.container}>
            <LoadableUploader serverUrl={serverUrl} />
        </div>
    );
}
export default Uploader;
