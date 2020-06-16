import Intro from '@components/Intro';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['intro'],
        component: Intro
    };
}
