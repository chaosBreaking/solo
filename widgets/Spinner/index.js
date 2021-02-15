import React from 'react';
import { CubeGrid } from 'better-react-spinkit';

const DEFAULT_STYLE = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export default function Spinner({ className, size = 42, color = 'var(--theme-primary)', style = DEFAULT_STYLE }) {
    return <div className={className} style={className ? {} : style}>
        <CubeGrid size={size} color={color} />
    </div>;
};
