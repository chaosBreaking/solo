import Dashboard from '@components/Dashboard';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['dashboard'],
        component: Dashboard
    };
}
