import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';

import s from './index.scss';

export default function ScrollTop({ background }) {
    useStyles(s);
    const scrollTop = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    };
    const [visiable, setVisiable] = React.useState(false);
    React.useEffect(() => {
        const listener = window.addEventListener('scroll', () => requestAnimationFrame(() => {
            if (window.pageYOffset > window.outerHeight / 2) {
                setVisiable(true);
            } else {
                setVisiable(false);
            }
        }));
        return () => window.removeEventListener('scroll', listener);
    }, [visiable]);
    return (
        <div
            className={cs(s.scrollTop, {
                [s.show]: visiable,
            })}
            onClick={scrollTop}
            style={{ background }}
        >
            <span className={'iconfont icon-fanhuidingbu'} style={{ fontSize: '.15rem' }} />
        </div>
    );
};
