import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Logo from '@widgets/Logo';
import { FlexSearchBar } from '@widgets/SearchBar';
import s from './index.scss';

function NavigationBar(props) {
    useStyles(s);
    const { saveContent, publishContent } = props;
    const save = () => saveContent();
    const publish = () => publishContent();

    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.left}>
                    <Logo size={'middle'} />
                    <FlexSearchBar />
                </div>
                <div className={s.right}>
                    <div className={s.save} onClick={save}>存为草稿</div>
                    <div className={s.publish} onClick={publish}>发布</div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NavigationBar);
