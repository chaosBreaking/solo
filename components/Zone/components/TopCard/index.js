import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import ProfileLine from '@widgets/ProfileLine';
import Card from '@widgets/Card';
import s from './index.scss';
import BlockItem from '../BlockItem';
import Emage from '@widgets/Emage';
import RecCreators from '../RecCreators';

export default function TopCard(props) {
    useStyles(s);

    const profiles = [{
        avatar: 'https://api.ixiaowai.cn/api/api.php',
        nickname: '梁伊尔',
        intro: 'Never stop thinking'
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php',
        nickname: 'Allon',
        intro: 'Never stop thinking'
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=1',
        nickname: 'Bob',
        intro: 'Hello, i am fresh!'
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=2',
        nickname: 'Cobain',
        intro: 'It\'s better to burn out than fade away!'
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=3',
        nickname: 'Dacy',
        intro: 'Hello, i am fresh!'
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=4',
        nickname: 'Emma',
        intro: 'I can\'t stop loving you, no matter what you say i do'
    }];
    return (
        <div className={s.container}>
            <div className={s.info}>
                <div className={s.topContent}>
                    <Emage className={s.image} isFake />
                </div>
            </div>
            <Card className={s.card}>
                <div className={s.title}>热门创作者</div>
                <RecCreators data={profiles} />
            </Card>
        </div >
    );
};
