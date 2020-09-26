import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Logo from '@widgets/Logo';
import { FlexSearchBar } from '@widgets/SearchBar';
import { forward } from '@utils/navi';
import s from './index.scss';

const ITEMS = [
    {
        title: '草稿',
        url: ''
    },
    {
        title: '疑问',
        url: ''
    },
    {
        title: '发现',
        url: '/explore'
    },
];

function NavigationBar(props) {
    useStyles(s);
    const { saveContent, publishContent } = props;
    const clickNavItem = url => {
        url && forward(url);
    };
    const save = () => saveContent();
    const publish = () => publishContent();

    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.left}>
                    <Logo size={'middle'} />
                    <FlexSearchBar />
                    <div className={s.items}>
                        {
                            ITEMS.map(
                                item => <div
                                    className={s.navItem}
                                    key={item.title}
                                    onClick={clickNavItem.bind(this, item.url)}
                                >
                                    {item.title}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={s.right}>
                    <div className={s.save} onClick={save}>存为草稿</div>
                    <div className={s.publish} onClick={publish}>发布</div>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
