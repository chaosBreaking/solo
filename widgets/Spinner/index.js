import React from 'react';
import { CubeGrid } from 'better-react-spinkit';
import { Backdrop } from '@material-ui/core';

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

export default function Spinner({ className, size = 42, color = 'var(--theme-editor)', style = DEFAULT_STYLE }) {
    return <Backdrop open={true} style={{ zIndex: 10 }}>
        <CubeGrid size={size} color={color} />
    </Backdrop>;
};
