import { SignUpFormData } from '@/app/signup/page';
import React, { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

function InputLabel(
    { label, type, id, register, errors }: { label: string, type: HTMLInputTypeAttribute, register: UseFormRegister<SignUpFormData>, id: keyof SignUpFormData, errors: FieldErrors<SignUpFormData> }
) {
    return (
        <div className="">
            <div className="relative border-2 border-borderGray rounded-lg focus-within:border-blue-700">
                <input type={type} {...register(id)} placeholder=" " className="block p-3 appearance-none focus:outline-none bg-transparent peer font-bold text-black" />
                <label htmlFor={id} className="absolute top-0 p-3 -z-1 duration-300 origin-0">{label}</label>
            </div>
            {errors[id] && <p className="text-destructive">{errors[id]?.message}</p>}
        </div>
    );
}

export default InputLabel;
