import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import Button from '@widgets/Button';
import Footer from '@widgets/Footer';
import Card from '@widgets/Card';

import s from './index.scss';

const Item = ({ children }) => <span>{children}</span>;
const Column = ({ title, children, }) => <div className={s.column}>
    <p>{title}</p>
    { children }
</div>;

export default function Bottom ({ store }) {
    useStyles(s);
    return (
        <Footer>
            <div className={s.container}>
                <div className={s.topLine}>
                    创建或者加入圈子
                    <Button className={s.btn} text={'即刻开始'} hollow />
                </div>
                <div className={s.intro}>
                    <Column title={'账户'}>
                        <Item>登录</Item>
                        <Item>注册</Item>
                        <Item>帮助</Item>
                    </Column>
                    <Column title={'发现'}>
                        <Item>圈子</Item>
                        <Item>创作者</Item>
                        <Item>话题</Item>
                    </Column>
                    <Column title={'Solo'}>
                        <Item>关于我们</Item>
                        <Item>招聘</Item>
                        <Item>反馈</Item>
                    </Column>
                </div>
            </div>
        </Footer>
    );
};
