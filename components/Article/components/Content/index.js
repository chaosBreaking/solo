import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import Emage from '@widgets/Emage';
import TagList from '../TagList';
import s from './index.scss';

export default function Content() {
    useStyles(s);
    const { store } = useStores();
    const { data = {} } = store;
    const {
        content,
        cover,
        title,
    } = data;
    return (
        <div className={s.container}>
            <div className={s.cover}>
                <Emage src={cover} />
            </div>
            <div className={s.header}>
                <section className={s.title}>
                    <h1>{title}</h1>
                </section>
                <TagList />
            </div>
            <article className={s.main}>
                <section className={s.content} dangerouslySetInnerHTML={{ __html: content }}>
                </section>
            </article>
        </div>
    );
};
