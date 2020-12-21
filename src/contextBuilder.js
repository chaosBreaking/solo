import queryString from 'query-string';
import { getCookies } from '@utils/cookie';

export default function (props) {
    const context = {};
    if (process.env.BROWSER) {
        return Object.assign(context, {
            pathname: location.pathname,
            query: queryString.parse(location.search),
            cookie: getCookies(),
        });
    } else {
        const { req, res } = props;
        return Object.assign(context, {
            pathname: req.path,
            query: req.query,
            req,
            res,
        });
    }
};
