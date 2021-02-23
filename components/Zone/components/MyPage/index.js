import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import { Avatar, Backdrop, Button, DialogActions, LinearProgress, TextField } from '@material-ui/core';
import cs from 'classnames';
import LoadingSVG from '@widgets/LoadingSVG';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';
import s from './index.scss';

export default observer(function MyPage() {
    useStyles(s);
    const { userStore, store } = useStores();
    const {
        nickname,
        avatar,
        bio,
        cover = 'http://fs.hyperii.com/a6nx3-docue.webp',
    } = userStore;
    const [open, setOpen] = React.useState(false);
    const [invalid, setInvalid] = React.useState(false);
    const [bioInput, setBio] = React.useState(bio);
    const [nicknameInput, setNickname] = React.useState(nickname);
    const [submitting, setSubmitting] = React.useState(false);
    const [pvCover, setPvCover] = React.useState(cover);
    const [pvAvatar, setPvAvatar] = React.useState(avatar);
    const coverRef = React.useRef();
    const avatarRef = React.useRef();
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleNick = e => {
        const validInput = e.target.value.slice(0, 20);
        if (!validInput) {
            setInvalid(true);
        } else {
            setInvalid(false);
        }
        setNickname(validInput);
    };
    const handleBio = e => {
        const validInput = e.target.value.slice(0, 200);
        if (!validInput) {
            setInvalid(true);
        } else {
            setInvalid(false);
        }
        setBio(validInput);
    };
    const handleCoverInput = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPvCover(URL.createObjectURL(file));
            coverRef.current = file;
        }
    };
    const handleAvatarInput = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setPvAvatar(URL.createObjectURL(file));
            avatarRef.current = file;
        }
    };

    const handleSave = async () => {
        if (!nicknameInput || !bioInput) {
            setInvalid(true);
            return;
        }
        setInvalid(false);
        setSubmitting(true);
        try {
            const imgs = await Promise.all([
                coverRef.current && cover !== coverRef.current
                    ? store.uploader(`cover-${nickname}-${Date.now()}`, coverRef.current)
                    : '',
                avatarRef.current && avatar !== avatarRef.current
                    ? store.uploader(`avatar-${nickname}-${Date.now()}`, avatarRef.current)
                    : '',
            ]);
            const data = {
                ...imgs[0] ? { cover: imgs[0] } : {},
                ...imgs[1] ? { avatar: imgs[1] } : {},
                ...bio !== bioInput ? { bio: bioInput } : {},
                ...nickname !== nicknameInput ? { nickname: nicknameInput } : {},
            };
            const res = await userStore.updateProfile(data);
            if (res) {
                toast.info('个人信息修改成功～');
                handleClose();
            }
        } catch (error) {
            console.log(error);
            toast.error('修改失败，请稍后重试～', { position: toast.POSITION.TOP_CENTER });
            handleClose();
        }
        setSubmitting(false);
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
            <div className={cs(s.dialog, {
                [s.submitting]: submitting
            })}>
                <LinearProgress style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 6,
                    width: '100%',
                    zIndex: 2,
                    visibility: submitting ? 'visible' : 'hidden',
                }} />
                <div className={s.title}>编辑资料</div>
                <div className={s.pv}>
                    <div className={s.pvCover}>
                        <img src={pvCover} />
                        <span className={'iconfont icon-bianji ' + s.icon} />
                        <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={handleCoverInput} />
                    </div>
                    <div className={s.pvAvatar}>
                        <Avatar style={{ width: '100%', height: '100%' }} alt={nickname} src={pvAvatar} />
                        <span className={'iconfont icon-bianji ' + s.icon} />
                        <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={handleAvatarInput}
                        />
                    </div>
                </div>
                <TextField
                    autoFocus
                    id="nickname"
                    label="昵称"
                    fullWidth
                    variant="filled"
                    helperText="个人昵称，20字以内"
                    disabled={submitting}
                    maxLength={20}
                    onChange={handleNick}
                    value={nicknameInput}
                    style={{ marginBottom: '.1rem' }}
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
                    {!submitting && <Button onClick={handleClose}>
                        取消
                    </Button>}
                    <Button onClick={handleSave} color="primary" variant='contained' disabled={submitting || invalid}>
                        {
                            submitting
                                ? <LoadingSVG height={'.12rem'} />
                                : '保存'
                        }
                    </Button>
                </DialogActions>
            </div>
        </Backdrop>
    </div>;
});
