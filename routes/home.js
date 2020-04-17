import Home from '@components/Home';

export default async function action () {
    return {
        title: '主页',
        chunks: ['home'],
        component: Home
    };
}
