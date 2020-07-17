import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Card from '@widgets/Card';
import s from './index.scss';

const MAX_INTRO_LENGTH = 100;

function IntroCard (props) {
    return <Card className={s.card}>
        <div className={s.title}>序言</div>
        <textarea className={s.introInput} placeholder={'输入序言内容'} maxLength={MAX_INTRO_LENGTH} rows={4}/>
    </Card>;
};

export default withStyles(s)(IntroCard);
