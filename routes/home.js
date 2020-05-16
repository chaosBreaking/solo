import Home from '@components/Home';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['home'],
        component: Home
    };
}
