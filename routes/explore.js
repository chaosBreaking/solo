import Explore from '@components/Explore';

export default async function action () {
    return {
        title: 'Solo',
        chunks: ['explore'],
        component: Explore
    };
}
