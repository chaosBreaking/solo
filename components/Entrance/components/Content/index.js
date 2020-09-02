import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Card from '@widgets/Card';
import Slider, { SlideItem } from '@widgets/Slider';

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
const ProfileCard = ({ data }) => <div className={s.profileCard}>
    <div className={s.img}></div>
    <div className={s.info}>
        <p className={s.name}>矢川三郎</p>
        <p className={s.intro}>前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。</p>
        <p className={s.extra}>被300+支持者孵化中</p>
    </div>
    <div className={s.supportLine}></div>
</div>;

export default withStyles(s)(function Content ({ data }) {
    const { title } = data;
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
    return <Section title={title}>
        <Slider className={s.slider} options={options}>
            <SlideItem><Card className={s.slideCard}>1</Card></SlideItem>
            <SlideItem><Card className={s.slideCard}>2</Card></SlideItem>
            <SlideItem><Card className={s.slideCard}>3</Card></SlideItem>
        </Slider>

        <div className={s.creators}>
            <ProfileCard></ProfileCard>
            <ProfileCard></ProfileCard>
            <ProfileCard></ProfileCard>
            <ProfileCard></ProfileCard>
        </div>
    </Section>;
});
