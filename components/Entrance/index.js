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
import Content from './components/Content';
import Bottom from './components/Footer';

import s from './index.scss';

const Header = props => <div className={s.header}>{props.children}</div>;
const Title = props => <span className={s.blockTitle}>{props.text}</span>;
const Block = props => <div className={s.block} style={{ width: `${props.width || 10}rem` }}>
    {props.title && <Title text={props.title} />}
    {props.children}
</div>;

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
        const { showLoginCard, contentList } = this.store;
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    {/* 注册要放到新的页面去做，因为注册成为创作者需要填写较多信息，所以最好进入一个纯净的新页面 */}
                    <Header>
                        <div className={s.headImg} />
                        <div className={s.info}>
                            <span>为你所发现而来，<br />为你所热爱而停留</span>
                            <Button text={'即刻加入'} className={s.btn} />
                        </div>
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
                        contentList.map((content, idx) => <Content key={idx} data={content} />)
                    }
                    <Block width={7}>
                        <span className={s.blockTitle}>发现更多夜空中闪亮的星</span>
                        <Card className={s.searchBar} row>

                        </Card>
                    </Block>
                    {showLoginCard && <Mask><LoginCard showClose /></Mask>}
                </div>
                <Bottom />
            </div>
        );
    }
}
