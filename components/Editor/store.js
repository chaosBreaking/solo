import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import { toast } from 'react-toastify';
import ContentService from './service';
import uploader from '@utils/upload';
import showSpinner from '@utils/spinner';
import AuthService from '@framework/common/services/AuthService';
import { setAccessToken } from '@framework/auth';
import { forward } from '@utils/navi';

const SESSION_KEY = 'EDITOR_SESSION_CONTENT';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;
    @observable editorContent = '';
    @observable editorTitle = '';
    @observable introContent = '';
    @observable coverImgUrl = '';
    @observable tags = [];
    @observable editorLoaded = false;

    @observable showLoginCard = false;

    contentService;

    @action.bound
    async initializeData(requestContext) {
        await this.initUploader();
        return {};
    }

    initService(axios) {
        this.contentService = new ContentService(axios);
        this.authService = new AuthService(axios);
    }

    @action.bound
    async initUploader() {
        const { token } = await this.contentService.requestTokenFunc();
        this.uploader = uploader(token);
    }

    @action.bound
    onEditorInit = editor => {
        this.editor = editor;
        this.loadSession();
        this.editorLoaded = true;
    }

    @action.bound
    handleEditorChange = value => {
        this.editorContent = value;
    }

    @action.bound
    saveContent = editor => {
        /**
         * todo: 将草稿同步到远端
         */
        if (!this.editorLoaded) {
            return;
        }
        // todo: 保存tags,封面图片和title等
        const sessionData = {
            title: this.editorTitle,
            content: this.editor.getContent(),
            intro: this.introContent,
            tags: this.tags,
            img: this.coverImgUrl,
        };
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
            toast.info('保存草稿成功', {
                position: toast.POSITION.TOP_LEFT,
            });
        } catch (error) {
            toast.warning('保存失败', {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    @action.bound
    loadSession() {
        try {
            const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY));
            if (sessionData) {
                const { title, content, intro, tags, img } = sessionData;
                this.editorContent = content;
                this.editorTitle = title;
                this.introContent = intro;
                this.tags = tags;
                this.coverImgUrl = img;
            }
        } catch (error) {
        }
    }

    @action.bound
    switchLoginCard = val => {
        // 出登录弹窗
        this.showLoginCard = val;
    }

    @action.bound
    handleLoginSubmit = async formData => {
        try {
            const res = await this.authService.handleLogin(formData);
            if (res.success) {
                const { accessToken } = res;
                setAccessToken(accessToken);
            }
            this.switchLoginCard(false);
            return res;
        } catch (error) {
            console.error(error);
            return { success: false, msg: error?.message };
        }
    }

    @action.bound
    setIntroContent = value => {
        this.introContent = value;
    }

    @action.bound
    setTags = value => {
        this.tags = value;
    }

    @action.bound
    setEditorTitle = value => {
        this.editorTitle = value;
    }

    @action.bound
    publishContent = async () => {
        if (!this.editorLoaded) {
            return;
        }
        const data = {
            title: this.editorTitle,
            intro: this.introContent,
            content: this.editor.getContent(),
            cover: this.coverImgUrl,
            tags: this.tags,
        };
        showSpinner();
        try {
            toast.info('正在发布中，请稍等...', {
                position: toast.POSITION.TOP_LEFT,
            });
            const res = await this.contentService.publishContent(data);
            localStorage.removeItem(SESSION_KEY);
            toast.info('文章发布成功，即将进入预览', {
                position: toast.POSITION.TOP_LEFT,
            });
            (requestAnimationFrame || setTimeout)(() => {
                const contentId = res._id;
                forward('/article.html', {
                    id: contentId,
                });
            });
        } catch (error) {
            if (error?.code === 403) {
                this.switchLoginCard(true);
            }
        }
    }
}
