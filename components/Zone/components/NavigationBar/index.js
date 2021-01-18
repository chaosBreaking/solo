import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';
import Avatar from '@widgets/Avatar';
import { StaticSearchBar } from '@widgets/SearchBar';

export default React.memo(function NavigationBar(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.logo}>S<span className={s.small}>olo</span></div>
            <div className={s.mainNav}>
                <StaticSearchBar
                    placeholder={'搜索圈子、创作者或作品集'}
                    PreIcon={() => <span className={'iconfont icon-fcstubiao13 ' + s.icon} />}
                />
            </div>
            {/* <div className={s.user}>
                <Avatar src={'https://api.ixiaowai.cn/api/api.php'} size={'normal'} />
            </div> */}
        </div>
    );
});
