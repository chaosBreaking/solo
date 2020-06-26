import Error from '@components/Error';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['error'],
        component: Error
    };
}
