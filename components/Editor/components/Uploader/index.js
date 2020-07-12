
import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Loadable from 'react-loadable';
import s from './index.scss';

const LoadingUI = props => props?.error
    ? <div>Error! <button onClick={ props.retry }>Retry</button></div>
    : <div>Loading...</div>;

const LoadableUploader = Loadable({
    loader: () => import('./uploader'),
    loading: LoadingUI,
    delay: 200,
    timeout: 10000,
});

function Uploader () {
    return (
        <div className={s.container}>
            <LoadableUploader />
        </div>
    );
}
export default withStyles(s)(Uploader);
