import React from 'react';
import { Spinner as Spinkit } from 'react-spinkit';

export default function Spinner({ name = 'circle', color = '--theme-primary' }) {
    return <Spinkit name={name} color={color} />;
};
