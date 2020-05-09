import React from 'react';

export default class BaseComponent extends React.Component {
    get store () {
        return this.props.store;
    }
}
