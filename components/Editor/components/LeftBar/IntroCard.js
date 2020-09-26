import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Card from '@widgets/Card';
import s from './index.scss';
import useStores from '@framework/util';

const MAX_INTRO_LENGTH = 100;

function IntroCard(props) {
    useStyles(s);
    const { store } = useStores();
    const { introContent, setIntroContent } = store;
    const inputHandler = e => {
        setIntroContent(e.target.value);
    };
    return <Card className={s.card}>
        <div className={s.title}>序言</div>
        <textarea
            className={s.introInput}
            placeholder={'输入序言内容'}
            maxLength={MAX_INTRO_LENGTH}
            rows={4}
            value={introContent}
            onChange={inputHandler}
        />
    </Card>;
};

export default observer(IntroCard);
