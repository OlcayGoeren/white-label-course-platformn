"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import { SignInFormDataSchema } from "@/types/signInUser";
import { SignUpFormDataSchemaUser } from "@/types/signupUser";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";


const SignInNormalUser: FC = () => {
    const router = useRouter();
    const hostname = window.location.hostname

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormDataSchema>({
        defaultValues: {
            domain: hostname
        },
        resolver: zodResolver(SignUpFormDataSchemaUser)
    });

    async function submit(data: any) {
        try {
            await axios.post('/api/signupUser', data)
            router.push('/signin')


        } catch (error) {

        }
    }

    return <>
        <div className="h-screen flex items-center justify-center">
            <form className="grid grid-cols-1 gap-2" onSubmit={handleSubmit(submit)}>
                <h1>Registrieren</h1>
                <Headline variant="h4">
                    Persönliche Daten
                </Headline>
                <InputLabel id="forname" label="Vorname" register={register} type="text" errors={errors} />
                <InputLabel id="surname" label="Nachname" register={register} type="text" errors={errors} />
                <InputLabel id="birthdate" label="Geburtsdatum" register={register} type="text" errors={errors} />

                <Headline variant="h4">
                    Login Daten
                </Headline>
                <InputLabel id="email" label="Email" register={register} type="email" errors={errors} />
                <InputLabel id="password" label="Passwort" register={register} type="password" errors={errors} />

                <Button>Registrieren</Button>
            </form>
        </div>
    </>
}

export default SignInNormalUser;