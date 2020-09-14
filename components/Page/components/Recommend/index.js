import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import ProfileLine from '@widgets/ProfileLine';
import s from './index.scss';
import RecRepoLine from '@widgets/RecRepoLine';

function Recommend (props) {
    const profiles = [{
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
    }];
    const repos = [{
        avatar: 'https://api.ixiaowai.cn/api/api.php',
        username: 'Allon',
        repoName: '思&科',
        intro: 'Never stop thinking',
        tags: [
            {
                type: 'repoType',
                data: { repoType: 0 },
            },
            {
                type: 'langType',
                data: { langType: 0 },
            },
            {
                type: 'stars',
                data: { stars: 2333 },
            },
            {
                type: 'sponsors',
                data: { sponsors: 996 },
            },
        ]
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=1',
        username: 'Bob',
        repoName: '后浪们该奔涌向何处',
        intro: '新一代还有没有改变世界的机会'
    }, {
        avatar: 'https://api.ixiaowai.cn/api/api.php?x=2',
        username: 'Cobain',
        repoName: 'loho',
        intro: '生活的艺术和开心的学问'
    }];
    const profileConfigs = {
        hideBtn: true,
        nameColor: '#000',
        introColor: '#666',
    };

    return (
        <div className={s.container}>
            <div className={s.body}>
                <div className={s.container}>
                    <div className={s.title}>发现 <span className={s.sub}>作品</span></div>
                    <RecRepoLine data={repos} />
                </div>
                <div className={s.container}>
                    <div className={s.title}>发现 <span className={s.sub}>创作者</span></div>
                    <ProfileLine data={profiles} configs={profileConfigs} />
                </div>
            </div>
        </div>
    );
};

export default withStyles(s)(Recommend);
