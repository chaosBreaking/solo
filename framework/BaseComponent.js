import React, { Component } from 'react';

export default class BaseComponent extends Component {
    get store () {
        return this.props.store;
    }
}
