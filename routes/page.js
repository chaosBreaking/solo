import Page from '@components/Page';

export default async function action() {
    return {
        title: 'Solo',
        chunks: ['page'],
        component: Page
    };
}
