import Entrance from '@components/Entrance';
import { ACCESS_TOKEN_KEY } from '@framework/auth';

export default async function action() {
    return {
        title: 'Solo',
        chunks: ['entrance'],
        component: Entrance,
        redirect: '/zone.html',
        checkRedirect: (req, res) => {
            return req.cookies[ACCESS_TOKEN_KEY];
        }
    };
}
