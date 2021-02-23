import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import { Avatar, Button, } from '@material-ui/core';
import { observer } from 'mobx-react';
import loadable from '@loadable/component';
import s from './index.scss';

export default observer(function MyPage() {
    useStyles(s);
    const { userStore } = useStores();
    const {
        nickname,
        avatar,
        bio,
        cover = 'http://fs.hyperii.com/a6nx3-docue.webp',
    } = userStore;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const ProfileDialog = loadable(() => import('./ProfileDialog'));

    return <div className={s.container}>
        <div className={s.top}>
            <img className={s.cover} src={cover} />
            <Avatar className={s.avatar} alt={nickname} src={avatar} />
        </div>
        <div className={s.profile}>
            <Button
                className={s.btn}
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleClickOpen}
            >编辑</Button>
            <span className={s.nickname}>{nickname}</span>
            <p className={s.bio}>{bio}</p>
        </div>
        <div className={s.content}>
        </div>
        {open && <ProfileDialog open={open} onClose={handleClose} />}
    </div>;
});
