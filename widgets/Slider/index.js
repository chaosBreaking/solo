import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';

import s from './index.scss';

export const SlideItem = ({ children, className }) => <div className={cs('keen-slider__slide', className)}>{children}</div>;

const ArrowLeft = (props) => {
    return (
        <svg
            onClick={props.onClick}
            className={cs(s.arrow, s.arrowLeft, { [s.arrowDisabled]: props.disabled })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
    );
};

const ArrowRight = (props) => {
    return (
        <svg
            onClick={props.onClick}
            className={cs(s.arrow, s.arrowRight, { [s.arrowDisabled]: props.disabled })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        </svg>
    );
};

const RealSlider = ({ className, options, children }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const { showNaviBtn, ...rest } = options;
    const [ref, slider] = useKeenSlider({
        ...rest,
        slideChanged (s) {
            setCurrentSlide(s.details().relativeSlide);
        }
    });
    return (
        <div className={cs(s.container, className)}>
            <div ref={ref} className={'keen-slider'}>
                {children}
            </div>
            {slider && showNaviBtn && (
                <>
                    <ArrowLeft
                        onClick={e => e.stopPropagation() || slider.prev()}
                        // disabled={currentSlide === 0}
                    />

                    <ArrowRight
                        onClick={e => e.stopPropagation() || slider.next()}
                        // disabled={currentSlide === slider.details().size - 1}
                    />
                </>
            )}
        </div>
    );
};

export default function Slider (props) {
    useStyles(s);
    const { className, children, options } = props;
    const [mounted, setMounted] = useState(false);
    const { showNaviBtn } = options;

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className={cs(s.container, className)}>
                <div className={'keen-slider'}>
                    {children}
                </div>
                {showNaviBtn && (
                    <>
                        <ArrowLeft
                            onClick={e => e.stopPropagation()}
                            disabled={true}
                        />

                        <ArrowRight
                            onClick={e => e.stopPropagation()}
                            disabled={true}
                        />
                    </>
                )}
            </div>
        );
    }

    return <RealSlider {...props} />;
};
