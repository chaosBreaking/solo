import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import { LoginCard } from '@widgets/AuthCards';
import NavigationBar from './components/NavigationBar';
import s from './index.scss';
import Mask from '@widgets/Mask';

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
        const { bgUrl, showLoginCard } = this.store;
        return (
            <div className={s.container}>
                <NavigationBar />
                {/* <div className={s.banner}>
                    <span className={s.bottomInfo}>Solo是什么?</span>
                </div> */}
                <div className={s.home} style={{
                    backgroundImage: `url(${bgUrl})`
                }}>
                    {/* <AuthCard /> */}
                </div>
                <div className={s.main}>
                    {/* 注册要放到新的页面去做，因为注册成为创作者需要填写较多信息，所以最好进入一个纯净的新页面 */}
                    <div className={s.tepIntro}>
                        <h1>临时内容</h1><br />
                        <h1>首屏用于介绍和展示，吸引用户</h1><br />
                        <h1>具体内容可参考</h1><br />
                        <h1><a href="https://www.patreon.com/">Patreon</a></h1>
                        <h1><a href="https://ko-fi.com/">Ko-fi</a></h1>
                        <h1>目前可看页面</h1>
                        {
                            [
                                { name: '首页广告页面（本页）', url: '/' },
                                { name: '创作者控制台', url: '/dashboard.html' },
                                { name: '编辑器', url: '/editor.html' },
                                { name: '发现', url: '/explore.html' },
                                { name: '内容主页', url: '/home.html' },
                                { name: '注册页', url: '/signup.html' },
                                { name: '分类圈子主页', url: '/zone.html' },
                            ].map(({ name, url }) => {
                                return (
                                    <>
                                        <a key={url} href={url}>{name}</a><br />
                                    </>
                                );
                            })
                        }
                    </div>
                    {showLoginCard && <Mask><LoginCard /></Mask>}
                </div>
            </div>
        );
    }
}
