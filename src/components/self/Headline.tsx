import React from 'react';

type HeaderProps = {
    variant: string;
    children?: React.ReactNode;
};

const Headline: React.FC<HeaderProps> = ({ variant, children }) => {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
};

export default Headline;
