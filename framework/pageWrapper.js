import React from 'react';
import { Provider } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from '@src/static/basic.scss';

export default (options = {}) => {
    return Component => {
        const { Store, pageInfo } = options;

        class Page extends React.Component {
            static Store = Store
            constructor (props) {
                super(props);
                this.initialProps = {
                    context: props.context,
                    store: props.store,
                    pageInfo
                };
            }

            render () {
                return (
                    <Provider {...this.initialProps}>
                        <Component />
                    </Provider>
                );
            }
        }

        return withStyles(s)(Page);
    };
};
