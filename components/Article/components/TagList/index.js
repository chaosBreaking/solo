import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
// import Emage from '@widgets/Emage';
// import Slider, { SlideItem } from '@widgets/Slider';
import s from './index.scss';

export default function TagList() {
    useStyles(s);
    const { store } = useStores();
    const { data = {} } = store;
    const {
        tags = [],
    } = data;
    // 暂时不用slider，等有了tag配图再用
    if (!tags.length) return null;
    return (
        <div className={s.container}>
            {
                !!tags.length && tags.map((item, index) => (
                    // <SlideItem className={s.item} key={index}>#{item}</SlideItem>
                    <div className={s.item} key={index}>#{item}</div>
                ))
            }
            {/* <Slider
                className={s.slider}
                options={{
                    slidesPerView: 10,
                    mode: 'free-snap',
                    spacing: 10,
                    // loop: true,
                }}>
                {!!tags.length && tags.map((item, index) => (
                    <SlideItem className={s.item} key={index}>#{item}</SlideItem>
                ))}
            </Slider> */}
        </div>
    );
};
