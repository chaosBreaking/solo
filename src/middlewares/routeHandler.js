import router from '../router';

export default async (req, res, next) => {
    const context = {
        pathname: req.path,
        query: req.query,
    };

    try {
        const route = await router.resolve(context);
        if (route.redirect) {
            const needRedirect = !route.checkRedirect || route.checkRedirect(req, res);
            if (needRedirect) {
                res.redirect(route.status || 302, route.redirect);
                return;
            }
        }

        res.locals.route = route;
        res.locals.ssr = req.query.ssr !== 'false' && req.query.csr === undefined;
    } catch (error) {
        if (error.status === 404) {
            return next();
        }
        console.error(error);
        next(error);
    }
    next();
};
