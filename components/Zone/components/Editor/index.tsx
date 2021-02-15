import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import useStores from '@framework/util';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import loadable from '@loadable/component';
import { EXTEND_TYPE, ICONS } from './constant';
import Store from '../../store';

import s from './index.scss';

const TagInput = loadable(() => import('./TagInput'));
const ImgUploader = loadable(() => import('./ImgUploader'));

export default function Editor(props) {
    useStyles(s);
    let images = [];
    const { store } = useStores();
    const [activeExtendsList, setActiveExtendsList] = React.useState([]);
    const [sending, setSending] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const getExtend = extendType => {
        switch (extendType) {
            case EXTEND_TYPE.HIDDEN:
                return null;
            case EXTEND_TYPE.IMAGE:
                return <ImgUploader key={EXTEND_TYPE.IMAGE} images={images} setImages={imgs => images = imgs} />;
            case EXTEND_TYPE.TAG:
                return <TagInput key={EXTEND_TYPE.TAG} tags={tags} setTags={setTags} />;
            case EXTEND_TYPE.MORE:
                return null;
        }
    };
    const handleExtendsClick = (type) => {
        const index = activeExtendsList.findIndex(item => item === type);
        if (index === -1) {
            setActiveExtendsList(activeExtendsList.concat(type));
        } else {
            const arr = [...activeExtendsList];
            arr.splice(index, 1);
            setActiveExtendsList(arr);
        }
    }
    const handleSend = async () => {
        setSending(true);
        const res = await store.sendPost({
            content,
            tags,
            images,
        });
        images = [];
        setContent('');
        setTags([]);
        setSending(false);
        setActiveExtendsList([]);
    };
    return <div className={s.container}>
        {sending && <LinearProgress style={{ width: '100%' }} color="secondary" />}
        {sending && <div className={s.mask} />}
        <div className={s.editor}>
            <TextareaAutosize
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{
                    width: '100%',
                    flex: 1,
                    padding: '.05rem .1rem 0',
                }}
                rowsMin={5}
                rowsMax={10}
                maxLength={500}
                aria-label="此刻在想什么？"
                placeholder="此刻在想什么？"
            />
        </div>
        <div className={s.bar}>
            {
                ICONS.map(({ title, icon, type }) => <Tooltip key={title} title={title} arrow placement="top-start">
                    <span className={cs(`iconfont ${icon}`, s.icon, {
                        [s.expanded]: activeExtendsList.includes(type)
                    })} onClick={() => handleExtendsClick(type)} />
                </Tooltip>)
            }
            <Button
                className={s.send}
                variant="contained"
                color="primary"
                disableElevation
                size="small"
                disabled={sending}
                onClick={handleSend}
            >
                {
                    sending ? '发送中' : '推他!'
                }
            </Button>
        </div>
        <div className={s.extendBar} style={{ display: activeExtendsList.length ? 'flex' : 'none' }}>
            {activeExtendsList.map(extendType => <div className={s.extendLine} key={extendType}>
                {getExtend(extendType)}
            </div>)}
        </div>
    </div>;
};
