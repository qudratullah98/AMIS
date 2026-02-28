import React from 'react';

const Skeleton = ({ width, height, className }) => {
    return (
        <div
            className={`bg-gray-300 animate-pulse rounded ${className}`}
            style={{ width, height }}
        ></div>
    );
};

export default Skeleton;