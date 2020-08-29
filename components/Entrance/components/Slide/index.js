import React from 'react';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import cs from 'classnames';

export const SlideItem = ({ children, className }) => <div className={cs('keen-slider__slide', className)}>{children}</div>;

export default function Slide ({ className, children }) {
    const [sliderRef, slider] = useKeenSlider({
        spacing: 10,
        slidesPerView: 1,
        centered: true,
        loop: false,
        mode: 'snap',
        breakpoints: {
            '(min-width: 768px)': {
                slidesPerView: 2,
                mode: 'free-snap'
            },
            '(min-width: 1200px)': {
                slidesPerView: 3,
                mode: 'free-snap'
            }
        }
    });
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true));
    if (!mounted) {
        return <div style={{ display: 'flex' }}>
            {children}
        </div>;
    }
    return (<div ref={sliderRef} className={className}>
        {children}
    </div>);
};
