/**
 *  Solo网站首页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import { LoginCard } from '@widgets/AuthCards';
import NavigationBar from './components/NavigationBar';
import Mask from '@widgets/Mask';
import Button from '@widgets/Button';
import { StaticSearchBar } from '@widgets/SearchBar';
import Card from '@widgets/Card';

import s from './index.scss';
import Content from './components/Content';

const Header = props => <div className={s.header}>{props.children}</div>;
const Title = props => <span className={s.blockTitle}>{props.text}</span>;
const Block = props => <div className={s.block} style={{ width: `${props.width || 10}rem` }}>
    {props.title && <Title text={props.title} />}
    {props.children}
</div>;
const Section = ({ width = 7, children, ...rest }) => <Block width={width} {...rest}>
    <div className={s.sectionCard}>{children}</div>
</Block>;

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Entrance extends Component {
    get store () {
        return this.props.store;
    }

    render () {
        const dfcontent = [
            {
                title: '视频创作',
            },
            {
                title: '摄影艺术',
            },
        ];
        const { showLoginCard, contents = dfcontent } = this.store;
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    {/* 注册要放到新的页面去做，因为注册成为创作者需要填写较多信息，所以最好进入一个纯净的新页面 */}
                    <Header>
                        <div className={s.info}>
                            <span>为你所发现而来，<br />为你所热爱而停留</span>
                            <Button text={'即刻加入'} className={s.btn} />
                        </div>
                        <div className={s.headImg} />
                    </Header>
                    <Block width={7}>
                        <span className={s.blockTitle}>探索你感兴趣的社区、圈子与创作者</span>
                        <Card className={s.searchBar} row>
                            <div className={s.search}>
                                <StaticSearchBar
                                    placeholder={'搜索圈子、创作者或作品集'}
                                    PreIcon={() => <span className='iconfont icon-fcstubiao13' />}
                                />
                            </div>
                            <Button text={'搜索'} className={s.btn} hollow />
                        </Card>
                    </Block>
                    {
                        contents.map((content, idx) => <Content key={idx} data={content} />)
                    }
                    {/* <Section title={'视频创作'}>
                        <div className={s.creators}>
                            <Card className={s.profileCard}></Card>
                            <Card className={s.profileCard}></Card>
                            <Card className={s.profileCard}></Card>
                            <Card className={s.profileCard}></Card>
                        </div>
                        <div className={s.creators}>
                            <Card className={s.profileCard}></Card>
                            <Card className={s.profileCard}></Card>
                            <Card className={s.profileCard}></Card>
                            <Card className={s.profileCard}></Card>
                        </div>
                    </Section>
                    <Section title={'摄影艺术'} >
                    </Section> */}
                    {showLoginCard && <Mask><LoginCard showClose /></Mask>}
                </div>
            </div>
        );
    }
}
