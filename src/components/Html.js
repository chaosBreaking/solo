
import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';

/* eslint-disable react/no-danger */

export default function Html({
    title,
    description,
    styles,
    scripts,
    rawData,
    children,
    mdStyles,
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover" />
                {scripts.map(script => (
                    <link key={script} rel="preload" href={script} as="script" />
                ))}
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_1780295_10itbhs0m0j.css"></link>
                {styles.map(style => (
                    <style
                        key={style.id}
                        id={style.id}
                        dangerouslySetInnerHTML={{ __html: style.cssText }}
                    />
                ))}
                <style id="jss-server-side">${mdStyles}</style>
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                <script
                    dangerouslySetInnerHTML={{ __html: `window.__ssrData=${serialize(rawData)}` }}
                />
                {scripts.map(script => (
                    <script key={script} src={script} />
                ))}
                {config.analytics.googleTrackingId && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                                `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`,
                        }}
                    />
                )}
                {config.analytics.googleTrackingId && (
                    <script
                        src="https://www.google-analytics.com/analytics.js"
                        async
                        defer
                    />
                )}
            </body>
        </html>
    );
}

Html.propTypes = {
    title: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            cssText: PropTypes.string.isRequired,
        }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
};

Html.defaultProps = {
    styles: [],
    scripts: [],
};
