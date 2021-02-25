import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Menu, MenuItem } from '@material-ui/core';
import { observer } from 'mobx-react';
import useStores from '@framework/util';
import { formatCreatedAt } from '@utils/format';
import s from './index.scss';

export default observer(function PostsCard({
    data,
    CommentPannel,
}: { data: any, CommentPannel?: any }) {
    const {
        _id,
        uid,
        likes,
        avatar,
        tags = [],
        imgs = [],
        content,
        nickname,
        commentCount,
        createdAt,
        self,
    } = data;
    useStyles(s);
    const { store } = useStores();
    const { serverTime } = store;
    const [showCommentPannel, setShowCommentPannel] = React.useState(false);
    const deleteRef = React.useRef();
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const formatUrl = url => url.startsWith('//') ? url : ('//' + url);
    const ts = formatCreatedAt(createdAt, serverTime);
    const handleDelete = async () => {
        await store.deletePost(_id);
        setAnchorEl(false);
        setShowConfirmDelete(false);
    };
    const jumpProfile = () => {
        store.navToUser(uid);
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.left} onClick={jumpProfile}>
                    <Avatar className={s.avatar} src={avatar} variant="square">{nickname.slice(0, 1)}</Avatar>
                    <div className={s.nickname}>{nickname}</div>
                </div>
                <div className={s.body}>
                    <p className={s.content}>
                        {content}
                    </p>
                    {!!imgs.length && <div className={s.imageWrapper}>
                        {
                            imgs.map(url => <img className={s.image} src={formatUrl(url)} key={url} />)
                        }
                    </div>}
                    <div className={s.bottom}>
                        {
                            !!tags.length && <div className={s.tags}>
                                {
                                    tags.map(item => (
                                        <span key={item}>{item}</span>
                                    ))
                                }
                            </div>
                        }
                        <div className={s.btns}>
                            {/* <div className={s.comment}>
                                <span className={s.icon} onClick={like}>
                                    👏
                                </span>
                                {!!likes && <span className={s.likes}>
                                    {likes > 999 ? '999+' : likes}
                                </span>}
                            </div> */}
                            <div className={s.comment}>
                                <span className={'iconfont icon-i-message ' + s.icon} onClick={() => setShowCommentPannel(!showCommentPannel)} />
                                {!!commentCount && <span className={s.commentNum}>
                                    {commentCount > 999 ? '999+' : commentCount}
                                </span>}
                            </div>
                            {self && <span
                                className={'iconfont icon-more4 ' + s.icon}
                                onClick={() => setAnchorEl(true)}
                                ref={deleteRef}
                            />}
                            <Menu
                                id="simple-menu"
                                anchorEl={deleteRef.current}
                                keepMounted
                                disableAutoFocusItem
                                open={anchorEl}
                                onClose={() => setAnchorEl(false)}
                                transformOrigin={{
                                    vertical: -50,
                                    horizontal: 'center',
                                }}
                            >
                                {self && <MenuItem onClick={() => setShowConfirmDelete(true)} style={{ color: '#666' }}>删除</MenuItem>}
                            </Menu>
                        </div>
                        <div className={s.ts}>
                            <span>{ts}</span>
                        </div>
                    </div>
                    {showCommentPannel && <>
                        <Divider style={{ width: '100%' }} />
                        {!!CommentPannel && <CommentPannel post={data} />}
                    </>}
                    <Dialog
                        open={showConfirmDelete}
                        onClose={() => setShowConfirmDelete(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                确定要删除该条推文吗？
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDelete} color="primary" autoFocus>
                                确定
                            </Button>
                            <Button onClick={() => setShowConfirmDelete(false)} color="primary">
                                取消
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div >
        </div>
    );
});
