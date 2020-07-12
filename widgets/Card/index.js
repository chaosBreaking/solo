import React, { ReactDOM } from 'react';
import { observer } from 'mobx-react';

const containerStyle = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '.05rem .1rem 0',
    borderRadius: '.05rem',
    background: '#fff',
    WebkitBoxShadow: '0 2px 6px 0 rgba(0, 0, 0, .12)',
    MozBoxShadow: '0 2px 6px 0 rgba(0, 0, 0, .12)',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, .12)',
};

function Card (props) {
    const {
        className,
        children
    } = props;
    return (
        <div className={className} style={containerStyle}>
            { children }
        </div>
    );
};

export default observer(Card);
