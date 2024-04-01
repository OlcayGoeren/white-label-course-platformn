import React, { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

function TextAreaLabel(
    { label, id, register, errors }:
        {
            label: string, register: UseFormRegister<any>,
            id: string
            , errors: FieldErrors<any>
        }
) {
    return (
        <div className="">
            <div className="relative border-2 border-borderGray rounded-lg focus-within:border-blue-700">
                <textarea  {...register(id)} placeholder=" " className="block p-3 appearance-none focus:outline-none 
                bg-transparent peer font-bold text-black w-full" 
                rows={5}
                />
                <label htmlFor={String(id)} className="absolute top-0 p-3 -z-1 duration-300 origin-0">{label}</label>
            </div>

            {/* @ts-ignore */}
            {errors[id] && <p className="text-destructive">{errors[id]?.message}</p>}
        </div>
    );
}

export default TextAreaLabel;
