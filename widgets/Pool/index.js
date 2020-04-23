import React from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@src/iso';
import s from './index.iso.scss';

const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;

@withStyles(s)
@inject('store')
@observer
export default class Pool extends React.Component {
    ref = React.createRef();
    column = React.createRef();
    row = React.createRef();
    constructor (props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            width: MIN_WIDTH,
            height: MIN_HEIGHT
        };
    }

    componentDidMount () {
        const target = this.ref.current;
        this.events = [
            target.addEventListener('mousedown', this.onMouseDownBody),
            target.addEventListener('mousemove', this.onMouseMoveBody),
            target.addEventListener('mouseup', this.onMouseUpBody),
            target.addEventListener('mouseleave', this.onMouseLeaveBody),
            this.row.current.addEventListener('mousedown', this.onMouseDownScale),
            this.row.current.addEventListener('mousemove', this.onMouseMoveScale),
            this.row.current.addEventListener('mouseup', this.onMouseUpScale),
            this.row.current.addEventListener('mouseleave', this.onMouseLeaveScale),
            this.column.current.addEventListener('mousedown', this.onMouseDownScale),
            this.column.current.addEventListener('mousemove', this.onMouseMoveScale),
            this.column.current.addEventListener('mouseup', this.onMouseUpScale),
            this.column.current.addEventListener('mouseleave', this.onMouseLeaveScale),
        ];
    }

    componentWillUnmount () {
        this.events.map(listener => this.ref.current.removeEventListener(listener));
    }

    onMouseDownBody = (e) => {
        e.stopPropagation();
        this.move = true;
        this._startX = e.clientX - this.state.left;
        this._startY = e.clientY - this.state.top;
    }

    onMouseDownScale = (e) => {
        e.stopPropagation();
        this.scale = true;
    }

    onMouseMoveBody = (e) => {
        e.stopPropagation();
        if (!this.move || this.scale) return;
        const { clientX, clientY } = e;
        // 块移动
        const left = clientX - this._startX;
        const top = clientY - this._startY;
        this.setState({
            left,
            top
        });
    }

    onMouseMoveScale = (e) => {
        // 块缩放
        e.stopPropagation();
        if (!this.scale || this.move) return;
        const { clientX, clientY } = e;
        const computedX = +clientX - this.state.left + 20;
        const computedY = +clientY - this.state.top + 20;
        const width = computedX > MIN_WIDTH ? computedX : this.state.width;
        const height = computedY > MIN_HEIGHT ? computedY : this.state.height;
        this.setState({
            width,
            height
        });
    }

    onMouseUpBody = (e) => {
        this.move = false;
    }

    onMouseUpScale = (e) => {
        this.scale = false;
    }

    onMouseLeaveBody = (e) => {
        this.move = false;
    }

    onMouseLeaveScale = (e) => {
        if (
            e.clientX - (this.state.left + this.state.width) < 50 ||
            e.clientY - (this.state.top + this.state.height) < 50
        ) return;
        this.scale = false;
    }

    render () {
        return (
            <div className={s.container} ref={this.ref} style={{ top: this.state.top, left: this.state.left, width: this.state.width, height: this.state.height }}>
                <div className={s.column} ref={this.column}></div>
                <div className={s.row} ref={this.row}></div>
            </div>
        );
    };
}
