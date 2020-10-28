import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';
import { toast } from 'react-toastify';
import ContentService from './service';
import uploader from '@utils/upload';

const SESSION_KEY = 'EDITOR_SESSION_CONTENT';

export default class Store extends CommonStore {
    @observable dataList = [];
    @observable loadingStatus = 0;
    @observable editorContent = '';
    @observable editorTitle = '';
    @observable introContent = '';
    @observable coverImgUrl = '';
    @observable tags = [];

    contentService = new ContentService();

    @action.bound
    async initializeData(requestContext) {
        await this.initUploader();
        return {};
    }

    async initUploader() {
        const { token } = await this.contentService.requestTokenFunc();
        this.uploader = uploader(token);
    }

    @action.bound
    onEditorInit = editor => {
        this.editor = editor;
        this.loadSession();
    }

    @action.bound
    handleEditorChange = value => {
        this.editorContent = value;
    }

    @action.bound
    saveContent = editor => {
        // todo: 保存tags,封面图片和title等
        const sessionData = {
            title: this.editorTitle,
            content: this.editorContent,
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
        const data = {
            title: this.editorTitle,
            intro: this.introContent,
            content: this.editorContent,
            cover: this.coverImgUrl,
            tags: this.tags,
        };
        const res = await this.contentService.publishContent(data);
    }
}
