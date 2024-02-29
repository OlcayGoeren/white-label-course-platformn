import React from 'react';
import classNames from 'classnames';

type HeaderProps = {
    variant: "h1" | "sub" | "h2" | "h4";
    children: React.ReactNode;
    color?: "black" | "white";
};

const Headline: React.FC<HeaderProps> = ({ variant, children, color }) => {
    let element: React.ReactNode = <></>;
    switch (variant) {
        case 'h1': element = <h1 className={classNames("text-3xl  text-black font-bold", {
            "text-white": color === "white"

        })}>{children}</h1>; break;
        case "h2": element = <h1 className={classNames("text-2xl  text-black font-bold", {
            "text-white": color === "white"

        })}>{children}</h1>; break;
        case "h4": element = <h1 className={classNames("text-lg  text-black font-bold", {
            "text-white": color === "white"
        })}>{children}</h1>; break;
        case "sub": element = <h4 className={classNames("text-base text-[#595959]", {
            "text-white": color === "white"
        })} >{children}</h4>; break;
    }
    return element
};

export default Headline;
