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
    targetUid: string; // uid参数，展示某人的资料页用到
    targetUser: any;

    @observable activeView = ACTIVE_VIEW.ARTICLE.index;
    @observable dataList: any[] = [[], [], []];
    @observable hasMoreList = [true, true, true];
    @observable offsetIdList = ['', '', ''];
    @observable loadingStatusList = [0, 0, 0];
    @observable activeTabList = [0, 0, 0, 0, 0];
    @observable mainTabList = [[
        { title: '热门', id: 0 },
        // { title: '最新', id: 1 },
        // { title: '关注', id: 2 },
    ], [
        { title: '热门', id: 0 },
        // { title: '最新', id: 1 },
        // { title: '关注', id: 2 },
    ], [
        { title: '热门', id: 0 },
        // { title: '关注', id: 1 },
    ], [
        { title: '文章', id: 0 },
        { title: '推文', id: 1 },
        { title: '圈子', id: 2 },
    ], [
        { title: '文章', id: 0 },
        { title: '推文', id: 1 },
        { title: '圈子', id: 2 },
    ]];

    @observable myPageDataList: any[] = [[], [], []]; // 个人页面数据，分为文章/推文/圈子
    @observable myHasMoreList: any[] = [[], [], []]; // 个人页面数据，分为文章/推文/圈子
    @observable myPageLoadingStatusList = [0, 0, 0];
    @observable myOffsetList = [0, 0, 0];
    @observable myOffsetIdList = ['', '', ''];
    @observable loadingUserInfo = false;

    @computed
    get myPageArticle() {
        return this.myPageDataList[0];
    }

    @computed
    get myPagePost() {
        return this.myPageDataList[1];
    }

    @computed
    get myPageCommunity() {
        return this.myPageDataList[2];
    }

    @computed
    get myHasMore() {
        return this.myHasMoreList[this.activeTab];
    }

    set myHasMore(val) {
        this.myHasMoreList[this.activeTab] = val;
    }

    @computed
    get myOffset() {
        return this.myOffsetList[this.activeTab];
    }

    set myOffset(offset: number) {
        this.myOffsetList[this.activeTab] = offset;
    }

    @computed
    get myOffsetId() {
        return this.myOffsetIdList[this.activeTab];
    }

    set myOffsetId(offsetId: string) {
        this.myOffsetIdList[this.activeTab] = offsetId;
    }

    @computed
    get myPageLoadingStatus() {
        return this.myPageLoadingStatusList[this.activeTab];
    }

    set myPageLoadingStatus(status: number) {
        this.myPageLoadingStatusList[this.activeTab] = status;
    }

    @computed
    get activeTab() {
        return this.activeTabList[this.activeView];
    }

    @computed
    get mainTabs() {
        return this.mainTabList[this.activeView];
    }

    @computed
    get articleList(): any[] {
        return this.dataList[ACTIVE_VIEW.ARTICLE.index];
    }

    @computed
    get postList(): any[] {
        return this.dataList[ACTIVE_VIEW.POST.index];
    }

    @computed
    get communityList(): any[] {
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
        const { pathname, query } = requestContext;
        const { uid } = query;
        this.targetUid = uid;
        this.checkActiveView(pathname);
        await Promise.all([
            this.activeView === ACTIVE_VIEW.ME.index || this.activeView === ACTIVE_VIEW.USER.index
                ? this.loadMyPageData()
                : this.loadMore(),
            this.initUploader(),
            ...this.activeView === ACTIVE_VIEW.USER.index
                ? [this.queryUserInfo(uid)]
                : []
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
            this.setActiveView(ACTIVE_VIEW.POST.index);
        } else if (pathname.endsWith(ACTIVE_VIEW.COMMUNITY.path)) {
            this.setActiveView(ACTIVE_VIEW.COMMUNITY.index);
        } else if (pathname.endsWith(ACTIVE_VIEW.ME.path)) {
            this.setActiveView(ACTIVE_VIEW.ME.index);
        } else if (pathname.endsWith(ACTIVE_VIEW.USER.path)) {
            this.setActiveView(ACTIVE_VIEW.USER.index);
        } else {
            this.setActiveView(ACTIVE_VIEW.ARTICLE.index);
        }
    }

    @action.bound
    setActiveView(index: number) {
        if (index !== this.activeView) {
            if (index === ACTIVE_VIEW.ME.index || this.activeView === ACTIVE_VIEW.USER.index) {
                // 切回个人页面或者切出用户页面，需要清空数据，否则会使用其他用户数据
                this.clearMyPageData();
            }
            this.activeView = index;
        }
        // 服务端也用到该函数，做个判断
        process.env.BROWSER && window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    @action.bound
    setActiveTab(tabIndex: number) {
        if (tabIndex !== this.activeTab) {
            this.activeTabList[this.activeView] = tabIndex;
        }
        process.env.BROWSER && window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    @action.bound
    getService() {
        return {
            [ACTIVE_VIEW.ARTICLE.index]: this.contentService.getContentList,
            [ACTIVE_VIEW.POST.index]: this.contentService.getPostList,
            [ACTIVE_VIEW.COMMUNITY.index]: this.contentService.getCommunityList,
        }[this.activeView];
    }

    @action.bound
    getMyPageService() {
        return {
            0: this.contentService.getMyArticleList,
            1: this.contentService.getMyPostList,
            2: this.contentService.getMyCommunityList,
        }[this.activeTab];
    }

    @action.bound
    async queryUserInfo(userId: string) {
        const user = await this.contentService.queryUserInfo({ userId });
        this.targetUser = user;
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
    async loadMyPageData() {
        if (!this.myHasMore) {
            this.myPageLoadingStatus = -1;
            return;
        }
        this.myPageLoadingStatus = 1;
        const service = this.getMyPageService();
        const data: any[] = await service({
            ...this.targetUid ? { userId: this.targetUid } : {},
            offset: this.myOffset,
            // offsetId: this.myOffsetId,
            count,
        }).catch(err => {
            console.error(err);
            return [];
        });
        runInAction(() => {
            if (!data || !data.length) {
                this.myHasMore = false;
                this.myPageLoadingStatus = -1;
            } else {
                this.myOffset += data.length;
                this.myOffsetId = data[data.length - 1]._id;
                this.myPageDataList[this.activeTab].push(...data);
                this.myPageLoadingStatus = 0;
            }
        });
    }

    @action.bound
    clearMyPageData() {
        this.targetUid = null;
        this.targetUser = null;
        this.myPageDataList = [[], [], []];
        this.myOffsetIdList = ['', '', ''];
        this.myOffsetList = [0, 0, 0];
        this.myPageLoadingStatusList = [0, 0, 0];
        this.myHasMoreList = [true, true, true];
    }

    @action.bound
    async navToUser(uid) {
        if (!uid || this.activeView === ACTIVE_VIEW.ME.index || this.activeView === ACTIVE_VIEW.USER.index) {
            return;
        }
        const jump = () => {
            const dest = `/zone.html/${ACTIVE_VIEW.USER.path}?uid=${uid}`;
            history.pushState({ activeView: ACTIVE_VIEW.USER.index }, '', dest);
            this.setActiveView(ACTIVE_VIEW.USER.index);
        }
        if (uid !== this.targetUid) {
            this.clearMyPageData();
            this.targetUid = uid;
            this.loadingUserInfo = true;
            await Promise.all([
                this.queryUserInfo(uid),
                this.loadMyPageData(),
            ]);
            jump();
            this.loadingUserInfo = false;
        } else {
            jump();
        }
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
            this.setActiveView(index);
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

    @action.bound
    async deletePost(postId) {
        try {
            const success = await this.contentService.deletePost({ postId });
            if (success) {
                const indexOfMine = this.myPagePost.findIndex(post => post._id === postId);
                indexOfMine !== -1 && this.myPagePost.splice(indexOfMine, 1);
                const index = this.postList.findIndex(post => post._id === postId);
                index !== -1 && this.postList.splice(index, 1);
                toast.info('删除成功', { position: toast.POSITION.TOP_RIGHT });
            } else {
                throw new Error('');
            }
        } catch (error) {
            toast.error('删除失败，请稍后重试～', { position: toast.POSITION.TOP_RIGHT });
        }
    }
}
