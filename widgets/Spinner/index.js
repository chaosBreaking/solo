import React from 'react';
import { CubeGrid } from 'better-react-spinkit';

export default function Spinner({ size = 18, color = '--theme-primary' }) {
    return <CubeGrid size={size} color={color} />;
};
