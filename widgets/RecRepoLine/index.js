import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import RepoTags from '@widgets/RepoTags';

const RepoItem = ({ data }) => {
    const { username, repoName, intro, tags = [] } = data;
    return <div className={s.item}>
        <div className={s.info}>
            <div className={s.title}>
                {repoName}
                <span className={s.author}>
                    {username}
                </span>
            </div>
            <div className={s.intro}>{intro}</div>
        </div>
        <div className={s.bottom}>
            <RepoTags data={tags} />
        </div>
    </div>;
};

function RecRepoLine (props) {
    const { data } = props;
    const list = Object.prototype.toString.call(data) === '[object Array]'
        ? data
        : [data];
    return (
        <div className={s.container}>
            {
                list.map((item, index) => <RepoItem key={index} data={item} />)
            }
        </div>
    );
};

export default withStyles(s)(RecRepoLine);
