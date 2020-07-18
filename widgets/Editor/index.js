import React from 'react';
import Loadable from 'react-loadable';
import LoadingRipple from '@widgets/LoadingRipple';

const loadingStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const LoadingUI = props => props?.error
    ? <div>Error! <button onClick={ props.retry }>Retry</button></div>
    : <div style={loadingStyles}><LoadingRipple size={'original'} /><br /><h1>编辑器加载中...</h1></div>;

const LoadableEditor = Loadable({
    loader: () => import('./editor'),
    loading: LoadingUI,
    delay: 200,
    timeout: 10000,
});

export default function Editor (props) {
    return <LoadableEditor {...props} LoadingUI={LoadingUI} />;
};
