"use client"
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import { SignInFormDataSchema } from "@/types/signInUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const SignInNormalUser: FC = () => {

    // organizationMapper
    // Wenn nicht verfügbar error werfen
    const router = useRouter();
    const [loader, setLoader] = useState(false)
    const [showErr, setShowErr] = useState(false);
    const [value, setValue] = useState<null | string>(null);


    const [hostname, sethostname] = useState("")


    useEffect(() => {
        sethostname(window.location.hostname)
        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);
        setValue(parameters.get('callbackUrl'));
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormDataSchema>({
        defaultValues: {
            domain: hostname
        },
        resolver: zodResolver(SignInFormDataSchema)
    });

    async function submit(data: any) {
        setLoader(true)
        const result = await signIn(
            "credentials",
            {
                redirect: false,
                email: data.email,
                password: data.password,
            },
            {}
        )
        setLoader(false)
        if (result?.ok) {
            if (value) {
                router.push(decodeURIComponent(value));
            } else {
                router.push("/dashboard");
            }
        } else {
            setShowErr(true)
        }
    }

    return <>
        <div className="h-screen flex items-center justify-center">
            <form className="grid grid-cols-1 gap-1" onSubmit={handleSubmit(submit)}>
                <h1>Anmelden</h1>
                <InputLabel id="email" label="Email" register={register} type="email" errors={errors} />
                <InputLabel id="password" type="password" label="Passwort" register={register} errors={errors} />
                {showErr && <p className="text-destructive">Email oder Passwort stimmen nicht überein</p>}
                <Button>Login</Button>
            </form>
        </div>
    </>
}

export default SignInNormalUser;