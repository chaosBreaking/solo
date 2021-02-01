import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import TagsBox from '@widgets/TagsBox';
import ProfileLine from '@widgets/ProfileLine';
import ContentLine from '@widgets/ContentLine';
import TopicLine from '@widgets/TopicLine';
import s from './index.scss';
import Card from '@widgets/Card';
import { StaticSearchBar } from '@widgets/SearchBar';
import Button from '@widgets/Button';

export default function Recommend(props) {
    useStyles(s);
    // todo: RSS订阅
    return (
        <div className={s.container}>
            <div className={s.body}>
                <StaticSearchBar
                    className={s.search}
                    placeholder={'搜索圈子、创作者或作品集'}
                    PreIcon={() => <span className={'iconfont icon-fcstubiao13 ' + s.icon} />}
                />
                {/* <div className={s.search}>
                </div> */}
                {/* <Card className={s.card}>
                    <div className={s.title}>热门创作者</div>
                    <ProfileLine data={profiles} />
                </Card> */}
                {/* <Card className={s.card}>
                    <div className={s.title}>为你推荐</div>
                    <ContentLine data={content} />
                </Card>
                <Card className={s.card}>
                    <div className={s.title}>话题趋势</div>
                    <TopicLine data={topics} />
                </Card>
                <Card className={s.card}>
                    <span className={s.title}>热门标签</span>
                    <TagsBox tags={tags} />
                </Card> */}
                <Card className={s.card}>
                    <div className={s.title}>订阅圈子</div>
                    <div className={s.content}>
                        社群动态、热门内容，订阅Solo为您精选的社群内容，精彩不错过。
                    </div>
                    <div className={s.rssInput}>
                        <StaticSearchBar placeholder={'邮箱地址'} />
                        <Button className={s.subBtn} text={'订阅'} plain />
                    </div>
                </Card>
            </div>
        </div>
    );
};
