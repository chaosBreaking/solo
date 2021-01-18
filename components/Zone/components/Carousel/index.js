import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Slider, { SlideItem } from '@widgets/Slider';

import s from './index.scss';

const MockImg = ({ uni, src }) => (
    // <div style={{ width: '100%', height: '2rem', background: '#ddd' }} />
    <img src={src || 'https://api.ixiaowai.cn/api/api.php' + '?c=' + uni} />
);
const options = {
    spacing: 8,
    slidesPerView: 1,
    centered: true,
    loop: true,
    initial: 0,
    mode: 'snap',
    showNaviBtn: true,
};

export default React.memo(function Carousel({ data }) {
    useStyles(s);
    const { items = [1, 2, 3, 4, 5] } = data;
    return <div className={s.wrap}>
        <Slider className={s.slider} options={options}>
            {
                items.map((item, idx) => <SlideItem key={idx}>
                    <div data={item} idx={idx}><MockImg uni={idx} /></div>
                </SlideItem>)
            }
        </Slider>
    </div>;
});
