import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import s from './index.scss';
import Emage from '@widgets/Emage';

const content = `我为什么创建Solo...更好的连接创作者和观众，为数字游民digital nomad和独立创作者creators提供创作、展示和链接的工具。
创作者从创作到发布，获得关注和支持以及报酬。
订阅者和支持者获得与创作者/博主的互动机会、相关经验和第一手的信息以及资料。`;

function BlockItem(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <Emage className={s.image} />
            <div className={s.content}>
                <div className={s.title}>一个标题</div>
                <p className={s.intro}>{content}</p>
                {/* <div className={s.creatorBar}>
                    <Avatar className={s.avatar} isFake />
                    <div className={s.createrName}>Keii Kaven</div>
                </div> */}
            </div>
        </div>
    );
};

export default React.memo(BlockItem);
