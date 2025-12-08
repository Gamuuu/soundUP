import React from 'react';

const SectionHeading = ({ children, className = "" }) => {
    if (typeof children !== 'string') {
        return <h2 className={`text-4xl md:text-5xl font-bold text-white ${className}`}>{children}</h2>;
    }

    const words = children.split(' ');
    const firstWord = words[0];
    const rest = words.slice(1).join(' ');

    return (
        <h2 className={`text-4xl md:text-5xl font-bold text-white ${className}`}>
            <span className="text-accent">{firstWord}</span> {rest}
        </h2>
    );
};

export default SectionHeading;
