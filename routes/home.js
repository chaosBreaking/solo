import Index from '@components/Index';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['home'],
        component: Index
    };
}
