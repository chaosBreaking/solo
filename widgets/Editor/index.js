import React from 'react';
import Loadable from 'react-loadable';

const LoadingUI = props => props?.error
    ? <div>Error! <button onClick={ props.retry }>Retry</button></div>
    : <div>Loading...</div>;

const LoadableEditor = Loadable({
    loader: () => import('./editor'),
    loading: LoadingUI,
    delay: 200,
    timeout: 10000,
});

export default function Editor (props) {
    return <LoadableEditor {...props} />;
}
