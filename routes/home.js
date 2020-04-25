import Index from '@components/Index';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['index'],
        component: Index
    };
}
