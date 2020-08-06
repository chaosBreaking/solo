import Register from '@components/Register';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['register'],
        component: Register
    };
}
