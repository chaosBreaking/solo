import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import { forward } from '@utils/navi';
import s from './index.scss';

function BlockItem(props) {
    useStyles(s);
    const { leaders = Array.from({ length: 3 }), index, isFullLine } = props;
    const clickHandler = () => {
        forward('/zone.html');
    };
    return (
        <div
            className={cs(s.container, {
                [s.fullLine]: isFullLine,
                // [s.secondLine]: index >= 2 && index < 5,
            })}
            onClick={clickHandler}
        >
            <div className={s.info}>
                {/* <h2>科技</h2> */}
                {/* 圈子主题背景图 */}
                <img src={''} />
            </div>
            <div className={s.leaders}>
                {
                    leaders.map((item, index) => <Avatar
                        key={index}
                        className={s.avatar}
                        // src={'https://api.ixiaowai.cn/api/api.php'}
                        style={{
                            // position: 'relative',
                            // marginLeft: '-50%',
                            zindex: leaders.length - index
                        }}
                    />)
                }
            </div>
            <div className={s.content}></div>
        </div>
    );
};

export default React.memo(BlockItem);
