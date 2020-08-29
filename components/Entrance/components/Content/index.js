import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Card from '@widgets/Card';

// import 'keen-slider/keen-slider.min.css';
// import { useKeenSlider } from 'keen-slider/react';

import s from './index.scss';
import Slide, { SlideItem } from '../Slide';

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
    return <Section title={title}>
        <div className={s.slide}>
            <Slide>
                <SlideItem>1</SlideItem>
                <SlideItem>2</SlideItem>
                <SlideItem>3</SlideItem>
            </Slide>
        </div>
        <div className={s.creators}>
            <Card className={s.profileCard}></Card>
            <Card className={s.profileCard}></Card>
            <Card className={s.profileCard}></Card>
            <Card className={s.profileCard}></Card>
        </div>
    </Section>;
});
