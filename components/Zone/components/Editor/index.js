import Button from '@widgets/Button';
import React from 'react';
import Loadable from 'react-loadable';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import s from './index.scss';

const loadingStyles = {
    position: 'absolute',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const LoadingUI = props => props?.error
    ? <div>Error! <button onClick={props.retry}>Retry</button></div>
    : <div style={loadingStyles}></div>;

const LoadableEditor = Loadable({
    loader: () => import('./editor'),
    loading: LoadingUI,
    delay: 200,
    timeout: 10000,
});

export default function Editor(props) {
    useStyles(s);
    const [expanded, setExpanded] = React.useState(false);
    return <div className={s.container}>
        <div className={s.editor}>
            <LoadableEditor {...props} placeholder={'此刻在想什么？'} />
        </div>
        <div className={s.bar}>
            <span className={cs('iconfont icon-moreif', s.icon, {
                [s.expanded]: expanded
            })} onClick={() => setExpanded(!expanded)} />
            <span className={cs('iconfont icon-tupian', s.icon)} />
            <span className={cs('iconfont icon-tag', s.icon)} />
            <Button className={s.send} text={'推送'} />
        </div>
    </div>;
};
