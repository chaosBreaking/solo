import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';

import s from './index.scss';

export const SlideItem = ({ children, className }) => <div className={cs('keen-slider__slide', className)}>{children}</div>;

const RealSlider = ({ className, options, children }) => {
    const [ref] = useKeenSlider({
        ...options,
        loop: true,
    });
    return (
        <div ref={ref} className={cs('keen-slider', className)}>
            {children}
        </div>
    );
};

export default function Slider (props) {
    useStyles(s);
    const { className, children } = props;
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className={cs('keen-slider', className)} style={{ height: '3rem' }}>
                {children}
            </div>
        );
    }

    return <RealSlider {...props} />;
};
