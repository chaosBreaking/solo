import { observable, action, runInAction, computed } from 'mobx';
import CommonStore from '@framework/CommonStore';
import ContentService from './service';
import { ACTIVE_VIEW, NAVI_ITEMS, INavItem } from '@constants/ui';
import { forward } from '@utils/navi';
import { toast } from 'react-toastify';
import uploader from '@utils/upload';
import CloudService from '@framework/common/services/CloudService';

const count = 10;
export default class Store extends CommonStore {
    offsetList = [0, 0, 0];
    navItems = NAVI_ITEMS;
    contentService!: ContentService;
    cloudService!: CloudService;
    uploader: any;
    serverTime: Date = new Date();
    commentLock = false;
    queryCommentLock = false;

    @observable activeView = ACTIVE_VIEW.ME.index;
    @observable dataList: any[] = [[], [], []];
    @observable hasMoreList = [true, true, true];
    @observable offsetIdList = ['', '', ''];
    @observable loadingStatusList = [0, 0, 0];
    @observable activeTabList = [0, 0, 0, 0];
    @observable mainTabList = [[
        { title: '热门', id: 0 },
        { title: '最新', id: 1 },
        { title: '关注', id: 2 }
    ], [
        { title: '热门', id: 0 },
        { title: '最新', id: 1 },
        { title: '关注', id: 2 },
    ], [
        { title: '热门', id: 0 },
        { title: '关注', id: 1 },
    ], [
        { title: '文章', id: 0 },
        { title: '推文', id: 1 },
        { title: '圈子', id: 2 },
    ]];

    @computed
    get activeTab() {
        return this.activeTabList[this.activeView];
    }

    @computed
    get mainTabs() {
        return this.mainTabList[this.activeView];
    }

    @computed
    get articleList() {
        return this.dataList[ACTIVE_VIEW.ARTICLE.index];
    }

    @computed
    get postList() {
        return this.dataList[ACTIVE_VIEW.POST.index];
    }

    @computed
    get communityList() {
        return this.dataList[ACTIVE_VIEW.COMMUNITY.index];
    }

    @computed
    get offset() {
        return this.offsetList[this.activeView];
    }

    set offset(offset) {
        this.offsetList[this.activeView] = offset;
    }

    @computed
    get offsetId() {
        return this.offsetIdList[this.activeView];
    }

    set offsetId(offsetId: string) {
        this.offsetIdList[this.activeView] = offsetId;
    }

    @computed
    get loadingStatus() {
        return this.loadingStatusList[this.activeView];
    }

    set loadingStatus(status: number) {
        this.loadingStatusList[this.activeView] = status;
    }

    @computed
    get hasMore() {
        return this.hasMoreList[this.activeView];
    }

    set hasMore(val: boolean) {
        this.hasMoreList[this.activeView] = val;
    }

    @action.bound
    async initializeData(requestContext: any) {
        const { pathname } = requestContext;
        this.checkActiveView(pathname);
        await Promise.all([
            this.loadMore(),
            this.initUploader(),
        ]);
        return {};
    }


    @action.bound
    async prepareClientData() {
        await this.initUploader();
    }

    initService(axios: any) {
        this.contentService = new ContentService(axios);
        this.cloudService = new CloudService(axios);
    }

    @action.bound
    checkActiveView(pathname: string) {
        if (pathname.endsWith(ACTIVE_VIEW.POST.path)) {
            this.activeView = ACTIVE_VIEW.POST.index;
        } else if (pathname.endsWith(ACTIVE_VIEW.COMMUNITY.path)) {
            this.activeView = ACTIVE_VIEW.COMMUNITY.index;
        } else if (pathname.endsWith(ACTIVE_VIEW.ME.path)) {
            this.activeView = ACTIVE_VIEW.ME.index;
        } else {
            this.activeView = ACTIVE_VIEW.ARTICLE.index;
        }
    }

    @action.bound
    setActiveView(index: number) {
        if (index !== this.activeView) {
            this.activeView = index;
        }
    }

    @action.bound
    setActiveTab(tabIndex: number) {
        if (tabIndex !== this.activeTab) {
            this.activeTabList[this.activeView] = tabIndex;
        }
    }

    getService() {
        return {
            [ACTIVE_VIEW.ARTICLE.index]: this.contentService.getContentList,
            [ACTIVE_VIEW.POST.index]: this.contentService.getPostList,
            [ACTIVE_VIEW.COMMUNITY.index]: this.contentService.getCommunityList,
        }[this.activeView];
    }

    @action.bound
    async loadMore() {
        if (!this.hasMore) {
            this.loadingStatus = -1;
            return;
        }
        this.loadingStatus = 1;
        const service = this.getService();
        const data: any[] = await service({
            offset: this.offset,
            offsetId: this.offsetId,
            count,
        }).catch(err => {
            console.error(err);
            return [];
        });
        runInAction(() => {
            if (!data || !data.length) {
                this.hasMore = false;
                this.loadingStatus = -1;
            } else {
                this.offset += data.length;
                this.dataList[this.activeView].push(...data);
                this.offsetId = data[data.length - 1]._id;
                this.loadingStatus = 0;
            }
        });
    }

    @action.bound
    handleNav(item: INavItem) {
        const { insideView, url, index } = item;
        if (index === this.activeView) {
            return;
        }
        if (insideView) {
            const dest = `/zone.html/${url}`;
            history.pushState({ activeView: index }, '', dest);
            this.activeView = index;
        } else {
            forward(url);
        }
    }

    @action.bound
    async initUploader() {
        const { token } = await this.cloudService.requestTokenFunc();
        this.uploader = uploader(token);
    }

    @action.bound
    async uploadImages(list) {
        const taskList = list.map(item => {
            if (!item) {
                return '';
            }
            const { file, id } = item;
            const key = `post_imgs_${id}`;
            return this.uploader(key, file);
        });
        const res = await Promise.all(taskList);
        return res;
    }

    @action.bound
    async sendPost(data) {
        const { images, ...rest } = data;
        const urls = await this.uploadImages(images);
        const post = {
            ...rest,
            imgs: urls,
        };
        try {
            const res = await this.contentService.publishPost(post);
            this.dataList[ACTIVE_VIEW.POST.index].unshift({
                ...post,
                ...res,
            });
            toast.info('发布成功', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return res;
        } catch (error) {
            toast.error('发布失败', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }
    }

    @action.bound
    async sendComment(post: any, data: any) {
        if (this.commentLock) {
            return;
        }
        this.commentLock = true;
        const comment = {
            ...data,
            postId: post._id,
        };
        try {
            const res = await this.contentService.comment(comment);
            toast.info('评论成功', {
                position: toast.POSITION.TOP_CENTER,
            });
            runInAction(() => {
                this.commentLock = false;
                post.commentCount = typeof post.commentCount === 'number'
                    ? post.commentCount + 1
                    : 1;
                if (Array.isArray(post.comments)) {
                    post.comments.unshift(comment);
                } else {
                    post.comments = [comment];
                }
            })
            return res;
        } catch (error) {
            toast.error('评论失败', {
                position: toast.POSITION.TOP_CENTER,
            });
            this.commentLock = false;
            return false;
        }
    }

    @action.bound
    async loadComment(post) {
        if (this.queryCommentLock) {
            return;
        }
        this.queryCommentLock = true;
        try {
            const res = await this.contentService.queryComments({
                postId: post._id
            });
            post.comments = res;
            return res;
        } catch (error) {
            post.comments = [];
            return [];
        }
    }
}
