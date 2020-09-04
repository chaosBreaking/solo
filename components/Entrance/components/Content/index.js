import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Slider from '@widgets/Slider';
import ProfileCard from './ProfileCard';
import RecommendCard from './RecommendCard';

import s from './index.scss';

// 孵化能量？
const Title = props => <div className={s.topLine}>
    <span className={s.blockTitle}>{props.text}</span>
    <span className={s.more}>更多</span>
</div>;
const Block = props => <div className={s.block} style={{ width: `${props.width || 10}rem` }}>
    {props.title && <Title text={props.title} />}
    {props.children}
</div>;
const Section = ({ width = 7, children, ...rest }) => <Block width={width} {...rest}>
    <div className={s.sectionCard}>{children}</div>
</Block>;
// const MockImg = ({ uni, src }) => <img src={src || 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture' + '&c=' + uni} />;
const MockImg = ({ uni, src }) => <div style={{ width: '100%', height: '100%', background: '#ddd' }}></div>;
const options = {
    spacing: 8,
    // slidesPerView: 1,
    centered: true,
    loop: true,
    initial: 0,
    mode: 'snap',
    showNaviBtn: true,
    breakpoints: {
        '(min-width: 768px)': {
            slidesPerView: 2,
            // mode: 'free-snap'
        },
        '(min-width: 1200px)': {
            slidesPerView: 3,
            // mode: 'free-snap'
        }
    }
};

export default withStyles(s)(function Content ({ data }) {
    const { title, content } = data;
    const { creators, recommend } = content;
    return <Section title={title}>
        <Slider className={s.slider} options={options}>
            {
                recommend.map((item, idx) => <RecommendCard key={idx} data={item} idx={idx} />)
            }
        </Slider>
        <div className={s.creators}>
            {
                creators.map((item, idx) => <ProfileCard key={idx} data={item} idx={idx} />)
            }
        </div>
    </Section>;
});
