import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import s from './index.scss';

@inject('store')
@pageWrapper({
    Store
})
@observer
export default class Home extends Component {
    state = {
        content: '',
        show: false
    }

    componentDidMount () {
        this.setState({ show: true });
    }

    submit = () => {
        const data = this.editor.getData();
        this.setState({ content: data });
    }

    render () {
        return (
            <div className={s.container}>
            </div>
        );
    }
}
