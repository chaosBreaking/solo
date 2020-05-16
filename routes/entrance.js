import Entrance from '@components/Entrance';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['entrance'],
        component: Entrance
    };
}
