import Auth from '@components/Auth';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['auth'],
        component: Auth
    };
}
