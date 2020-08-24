import React from 'react';
import { Provider } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from '@src/static/basic.scss';
import { withProfiler } from '@sentry/react';

export default (options = {}) => {
    return Component => {
        const { Store, pageInfo } = options;

        class Page extends React.Component {
            static Store = Store

            constructor (props) {
                super(props);
                this.initialProps = {
                    context: props.context,
                    store: props.store || {},
                    pageInfo
                };
            }

            static async initializeProps (context) {
                const store = new Store({ getContext: () => ({ ...context }) });
                await store.initializeData(context);
                const hookFunc = process.env.BROWSER ? store.prepareClientData : store.prepareServerData;
                typeof hookFunc === 'function' && await hookFunc();
                return store;
            }

            static async rebuildStore (props) {
                const { context, ...otherProps } = props;
                const store = new Store({
                    getContext: () => ({ ...context }),
                    ...otherProps
                });
                typeof store.prepareClientData === 'function' && await store.prepareClientData();
                return store;
            }

            render () {
                return (
                    <Provider {...this.initialProps}>
                        <Component />
                    </Provider>
                );
            }
        }

        return withProfiler(withStyles(s)(Page));
    };
};
