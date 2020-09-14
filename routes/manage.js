import Manage from '@components/Manage';

export default async function action() {
    return {
        title: 'Solo',
        chunks: ['manage'],
        component: Manage
    };
}
