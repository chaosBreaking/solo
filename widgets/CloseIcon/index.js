import React from 'react';

export default function CloseIcon (props) {
    const { className, ...rest } = props;
    return (
        <span className={className} {...rest}>
            <svg
                version="1.1"
                // enableBackground="new 0 0 386.667 386.667"
                height="16"
                viewBox="0 0 386.667 386.667"
                width="16"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z"/>
            </svg>
        </span>
    );
};
