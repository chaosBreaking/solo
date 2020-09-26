import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { inject, observer } from 'mobx-react';
import MainTab from '../MainTab';
import Index from './widgets/Index';
import Repo from './widgets/Repo';
import Acitivity from './widgets/Acitivity';
import Shop from './widgets/Shop';

import s from './index.scss';

const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;

@withStyles(s)
@inject('store')
@observer
export default class Main extends Component {
    get store() {
        return this.props.store;
    }

    renderBody() {
        const { activeTab } = this.store;
        switch (activeTab) {
            case 0: return <Index />;
            case 1: return <Repo />;
            case 2: return <Acitivity />;
            case 3: return <Shop />;
        };
    }

    render() {
        return <div className={s.container}>
            <div className={s.topLine}>
                <MainTab />
                <div className={s.funcBtns}>
                    <div className={s.chat}><Icon name={'icon-i-message'} />私信</div>
                    <div className={s.share}><Icon name={'icon-fenxiang2'} />分享</div>
                </div>
            </div>
            <div className={s.body}>
                {this.renderBody()}
            </div>
        </div>;
    }
};
