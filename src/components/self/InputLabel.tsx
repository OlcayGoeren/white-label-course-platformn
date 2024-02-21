import React, { HTMLInputTypeAttribute } from 'react';

function InputLabel(
    { label, type }: { label: string, type: HTMLInputTypeAttribute }
) {
    return (
        <div className="relative border-2 border-borderGray rounded-lg focus-within:border-green-700 w-full">
            <input type={type} name={label} placeholder=" " className="block p-5 w-full text-lg appearance-none focus:outline-none bg-transparent peer font-bold text-black" />
            <label htmlFor={label} className="absolute top-0 p-5 text-lg -z-1 duration-300 origin-0">{label}</label>
        </div>



    );
}

export default InputLabel;
