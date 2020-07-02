import React from 'react';

const styles = {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const colorMap = {
    dark: '#000',
    bright: '#fff',
};

export default function LoadingSVG ({ theme = 'bright' }) {
    const color = colorMap[theme];
    return <div style={styles}>
        <svg version="1.1" id="loading" x="0px" y="0px" width=".22rem" height=".34rem" viewBox="0 0 24 30">
            <rect x="0" y="7.62827" width="4" height="14.7435" fill={color} opacity="0.4">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
            </rect>
            <rect x="8" y="9.87173" width="4" height="10.2565" fill={color} opacity="0.4">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
            </rect>
            <rect x="16" y="7.37173" width="4" height="15.2565" fill={color} opacity="0.4">
                <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
            </rect>
        </svg>
    </div>;
}
