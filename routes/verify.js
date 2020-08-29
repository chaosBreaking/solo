import Verify from '@components/Verify';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['verify'],
        component: Verify
    };
}
