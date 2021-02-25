import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import { Avatar, Button, } from '@material-ui/core';
import { observer } from 'mobx-react';
import loadable from '@loadable/component';
import Store from '../../store';
import Content from './Content';
import UserStore from '@framework/UserStore';
import s from './index.scss';
import LoadingSVG from '@widgets/LoadingSVG';

export default observer(function MyPage() {
    useStyles(s);
    const { userStore, store }: { userStore: UserStore, store: Store } = useStores();
    const { targetUser, targetUid, loadingUserInfo } = store;
    const {
        nickname,
        avatar,
        bio,
        cover = 'http://fs.hyperii.com/a6nx3-docue.webp',
    } = targetUser || userStore;
    const isSelf = !targetUid || targetUid === userStore.uid;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const ProfileDialog = loadable(() => import('./ProfileDialog'));
    const [isFollower, setIsFollower] = React.useState(false);
    React.useEffect(() => {
        const query = async () => {
            const res = await userStore.isFollower({ uid: targetUid });
            setIsFollower(res.result);
        };
        !isSelf && query();
    }, [isFollower, setIsFollower]);
    const followHandler = async () => {
        const res = await userStore.followHandler({ ...isFollower ? { cancel: true } : {}, uid: targetUid });
        if (res.success) {
            setIsFollower(res.followed);
        }
    }
    if (!isSelf && loadingUserInfo) {
        return <div className={s.container}>
            <div className={s.top}>
                <LoadingSVG />
            </div>
            <div className={s.profile}>
                <LoadingSVG />
            </div>
        </div>;
    }
    return <div className={s.container}>
        <div className={s.top}>
            <img className={s.cover} src={cover} />
            <Avatar className={s.avatar} alt={nickname} src={avatar} />
        </div>
        <div className={s.profile}>
            {
                isSelf
                    ? <Button
                        className={s.btn}
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={handleClickOpen}
                    >编辑</Button>
                    : <Button
                        className={s.btn}
                        variant={isFollower ? 'text' : "contained"}
                        color="primary"
                        disableElevation
                        onClick={followHandler}
                    >{isFollower ? '已关注' : '关注'}</Button>
            }
            <span className={s.nickname}>{nickname}</span>
            <p className={s.bio}>{bio}</p>
        </div>
        <Content key={targetUid} />
        {open && isSelf && <ProfileDialog open={open} onClose={handleClose} />}
    </div>;
});
