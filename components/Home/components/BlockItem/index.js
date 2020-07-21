import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import s from './index.scss';

function BlockItem (props) {
    const { leaders = Array.from({ length: 3 }), index } = props;
    const useUniStyle = index < 2;
    // const style = useUniStyle
    //     ? {
    //         width: `${index === 0 ? 50 : 33.3}%`,
    //         height:
    //     }
    //     : {};
    return (
        <div className={cs(s.container, {
            [s.topLine]: index < 2,
            [s.secondLine]: index >= 2 && index < 5,
        })}>
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

export default withStyles(s)(BlockItem);
