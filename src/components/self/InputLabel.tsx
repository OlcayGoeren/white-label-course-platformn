import React from 'react';

function InputLabel() {
    return (
        <div className="relative border-2 border-blue-700 rounded-lg focus-within:border-green-700">
            <input type="text" name="username" placeholder=" " className="block p-5 w-full text-lg appearance-none focus:outline-none bg-transparent peer" />
            <label htmlFor="username" className="absolute top-0 p-5 text-lg -z-1 duration-300 origin-0">Username</label>
        </div>



    );
}

export default InputLabel;
