import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import TagsBox from '@widgets/TagsBox';
import ProfileLine from '@widgets/ProfileLine';
import ContentLine from '@widgets/ContentLine';
import TopicLine from '@widgets/TopicLine';
import s from './index.scss';
import Card from '@widgets/Card';
import { StaticSearchBar } from '@widgets/SearchBar';
import Button from '@widgets/Button';

function Recommend (props) {
    const tags = ['COV-19', 'Anti-996', 'Utopia', 'Tech', 'Artificial Intelligence', 'hack', 'BlockChain', 'Pink'];
    const profiles = [{
        // avatar: 'https://api.ixiaowai.cn/api/api.php',
        nickname: 'Allon',
        intro: 'Never stop thinking'
    }, {
        // avatar: 'https://api.ixiaowai.cn/api/api.php?x=1',
        nickname: 'Bob',
        intro: 'Hello, i am fresh!'
    }, {
        // avatar: 'https://api.ixiaowai.cn/api/api.php?x=2',
        nickname: 'Cobain',
        intro: 'It\'s better to burn out than fade away!'
    }, {
        // avatar: 'https://api.ixiaowai.cn/api/api.php?x=1',
        nickname: 'Dacy',
        intro: 'Hello, i am fresh!'
    }];
    const content = [
        {
            // img: 'https://api.ixiaowai.cn/api/api.php?x=content1',
            title: '小布尔什乔亚的虚幻岁静',
            abstract: '轻型目录访问协议（英文：Lightweight Directory Access Protocol，缩写：LDAP，/ˈɛldæp/）是一个开放的，中立的，工业标准的应用协议，通过IP协议提供访问控制和维护分布式信息的目录信息。[1]',
            author: 'Kick Ass'
        },
        {
            // img: 'https://api.ixiaowai.cn/api/api.php?x=content2',
            title: '无辜者，不幸与必然',
            abstract: 'GPG 可以在互联网上，以数学为基础创造一个无法被伪造的身份，并以此身份签名信息、接收加密信息。',
            author: 'Shameless'
        },
        {
            // img: 'https://api.ixiaowai.cn/api/api.php?x=content3',
            title: '密码朋克宣言',
            abstract: '我们密码朋克，将投身于建设匿名的系统。 我们要捍卫自己的隐私，用密码学，用匿名邮件系统，用数字签名，用电子货币。',
            author: 'Eric Hughes'
        },
    ];
    const topics = [
        {
            title: '新一代还有没有改变世界的机会'
        },
        {
            title: '后浪们该奔涌向何处'
        },
        {
            title: '疫情，我，他们'
        },
        {
            title: '生活的艺术和开心的学问'
        },
        {
            title: '这个世界会好吗'
        },
    ];
    // todo: RSS订阅
    return (
        <div className={s.container}>
            <div className={s.body}>
                <Card className={s.card}>
                    <div className={s.title}>热门创作者</div>
                    <ProfileLine data={profiles} />
                </Card>
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
                <Card className={s.card}>
                    <div className={s.title}>为你推荐</div>
                    <ContentLine data={content}/>
                </Card>
                <Card className={s.card}>
                    <div className={s.title}>话题趋势</div>
                    <TopicLine data={topics}/>
                </Card>
                <Card className={s.card}>
                    <span className={s.title}>热门标签</span>
                    <TagsBox tags={tags}/>
                </Card>
            </div>
        </div>
    );
};

export default withStyles(s)(Recommend);
