import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import { Avatar, Backdrop, Button, DialogActions, TextField } from '@material-ui/core';

import s from './index.scss';

export default function MyPage() {
    useStyles(s);
    const { userStore } = useStores();
    const {
        nickname,
        avatar,
        bio,
        cover = 'http://fs.hyperii.com/a6nx3-docue.webp',
    } = userStore;
    const [open, setOpen] = React.useState(false);
    const [nicknameInput, setNickname] = React.useState(nickname);
    const [bioInput, setBio] = React.useState(bio);
    const [submitting, setSubmitting] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleNick = e => {
        const validInput = e.target.value.slice(0, 20);
        setNickname(validInput);
    };
    const handleBio = e => {
        const validInput = e.target.value.slice(0, 200);
        setBio(validInput);
    };
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
        <Backdrop open={open} onClose={handleClose} style={{ zIndex: 1 }}>
            <div className={s.dialog}>
                <div className={s.title}>编辑资料</div>
                <div className={s.pv}>
                    <img className={s.pvCover} src={cover} />
                    <Avatar className={s.pvAvatar} alt={nickname} src={avatar} />
                </div>
                <TextField
                    autoFocus
                    // margin="dense"
                    id="nickname"
                    label="昵称"
                    fullWidth
                    variant="filled"
                    helperText="个人昵称，20字以内"
                    disabled={submitting}
                    maxLength={20}
                    onChange={handleNick}
                    value={nicknameInput}
                />
                <TextField
                    autoFocus
                    id="bio"
                    label="简介"
                    fullWidth
                    helperText="个人简介，200字以内"
                    multiline
                    rows={2}
                    rowsMax={5}
                    variant="filled"
                    disabled={submitting}
                    onChange={handleBio}
                    value={bioInput}
                />
                <DialogActions>
                    <Button onClick={handleClose}>
                        取消
                    </Button>
                    <Button onClick={handleClose} color="primary" variant='contained'>
                        保存
                    </Button>
                </DialogActions>
            </div>
        </Backdrop>
    </div>;
};
