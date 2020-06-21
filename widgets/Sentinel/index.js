import React, { useState, useEffect } from 'react';

const noop = () => {};

export default function Sentinel (props) {
    const [hasShown, setHasShown] = useState(false);
    const { onShowAction = noop, onHideAction = noop, once = false } = props;
    const nodeRef = React.createRef();
    let destory = () => {};
    let lock = false;
    const observerCallBack = async entries => {
        if (lock) return;
        const { intersectionRatio, isIntersecting } = entries[0];
        if (hasShown && once) {
            return destory();
        }
        lock = true;
        if (isIntersecting && intersectionRatio > 0) {
            !hasShown && setHasShown(true);
            await onShowAction();
        } else {
            hasShown && await onHideAction();
        }
        lock = false;
    };
    useEffect(() => {
        const observer = new IntersectionObserver(observerCallBack, { threshold: [0] });
        observer.observe(nodeRef.current);
        destory = () => {
            observer.disconnect();
        };
        return destory;
    });
    return <div style={{ height: 1 }} ref={nodeRef} />;
}
