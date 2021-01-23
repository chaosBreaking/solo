import Article from '@components/Article';

export default async function action() {
    return {
        title: 'Solo | 文章',
        chunks: ['article'],
        component: Article
    };
}
