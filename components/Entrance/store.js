import { observable, action } from 'mobx';
import CommonStore from '@framework/CommonStore';

export default class Store extends CommonStore {
    @observable showExplore = true;
    @observable showLoginCard = false;
    @observable showRegistryCard = false;

    async initializeData(requestContext) {
        this.contentList = ['视频创作', '摄影艺术', '独立游戏', 'Cosplay'].map(title => ({
            title,
            content: {
                recommend: [
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                ],
                creators: [
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                    {
                        name: '矢川三郎',
                        bio: '正在创建Solo',
                        intro: '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声，汽车以及摇滚爱好者。',
                        support: '被300+支持者孵化中',
                        avatar: 'http://lorempixel.com/400/300?uni=' + title,
                        img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture&uni=' + title,
                    },
                ],
            },
        }));
        return { title: 'Solo' };
    }

    async prepareServerData(requestContext) {
        return {};
    }

    async prepareClientData(requestContext) {
        return {};
    }

    @action.bound
    switchRegistryCardCard(val) {
        this.showRegistryCard = val;
    }

    @action.bound
    switchLoginCard(val) {
        this.showLoginCard = val;
    }

    @action.bound
    switchExplorer(val) {
        this.showExplore = val;
    }

    @action.bound
    changeAuthType(type) {
        this.authType = type;
    }
}
