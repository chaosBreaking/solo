import Zone from '@components/Zone';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['zone'],
        component: Zone
    };
}
