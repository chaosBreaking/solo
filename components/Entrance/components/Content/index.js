import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Card from '@widgets/Card';
import Slider, { SlideItem } from '@widgets/Slider';

import s from './index.scss';

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

export default withStyles(s)(function Content ({ data }) {
    const { title } = data;
    const options = {
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
    };
    return <Section title={title}>
        <Slider className={s.slide} options={options}>
            <SlideItem><Card className={s.profileCard}>1</Card></SlideItem>
            <SlideItem><Card className={s.profileCard}>2</Card></SlideItem>
            <SlideItem><Card className={s.profileCard}>3</Card></SlideItem>
        </Slider>
        <div className={s.creators}>
            <Card className={s.profileCard}></Card>
            <Card className={s.profileCard}></Card>
            <Card className={s.profileCard}></Card>
            <Card className={s.profileCard}></Card>
        </div>
    </Section>;
});
