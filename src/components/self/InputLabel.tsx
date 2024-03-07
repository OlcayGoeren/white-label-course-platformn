import { SignUpFormData } from '@/types/signUp';
import React, { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

function InputLabel(
    { label, type, id, register, errors }:
        {
            label: string,
            type: HTMLInputTypeAttribute,
            register: UseFormRegister<any>,
            id: string
            , errors: FieldErrors<any>
        }
) {
    return (
        <div className="">
            <div className="relative border-2 border-borderGray rounded-lg focus-within:border-blue-700">
                <input type={type} {...register(id, { valueAsNumber: type === "number" ? true : false })} placeholder=" " className="block p-3 appearance-none focus:outline-none bg-transparent peer font-bold text-black w-full" />
                <label htmlFor={String(id)} className="absolute top-0 p-3 -z-1 duration-300 origin-0">{label}</label>
            </div>

            {/* @ts-ignore */}
            {errors[id] && <p className="text-destructive">{errors[id]?.message}</p>}
        </div>
    );
}

export function InputLabelDecoupled(
    { label, type, id, onChange, value }:
        {
            value: string,
            label: string,
            type: HTMLInputTypeAttribute,
            id: string,
            onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
        }
) {
    return (
        <div className="relative border-2 border-borderGray rounded-lg focus-within:border-blue-700 w-full">
            <input value={value} onChange={onChange} type={type} placeholder=" " className="block p-3 appearance-none focus:outline-none bg-transparent peer font-bold text-black w-full" />
            <label htmlFor={String(id)} className="absolute top-0 p-3 -z-1 duration-300 origin-0">{label}</label>
        </div>
    );
}

export default InputLabel;
