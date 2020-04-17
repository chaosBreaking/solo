import React from 'react';
import PropTypes from 'prop-types';

import StyleContext from 'isomorphic-style-loader/StyleContext';

export default function App ({ context, insertCss, children }) {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
        <StyleContext.Provider value={{ insertCss }}>
            {React.Children.only(children)}
        </StyleContext.Provider>
    );
}

App.propTypes = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
