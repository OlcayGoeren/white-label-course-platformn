"use client"
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import { SignInFormDataSchema } from "@/types/signInUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";


const SignInNormalUser: FC = () => {

    // organizationMapper
    // Wenn nicht verfügbar error werfen
    const router = useRouter();
    const hostname = window.location.hostname

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormDataSchema>({
        defaultValues: {
            domain: hostname
        },
        resolver: zodResolver(SignInFormDataSchema)
    });

    async function submit(data: any) {
        const result = await signIn(
            "credentials",
            {
                redirect: false,
                email: data.email,
                password: data.password,
            },
            {}
        )

        router.push("/dashboard");
    }

    return <>
        <div className="h-screen flex items-center justify-center">
            <form className="grid grid-cols-1 gap-1" onSubmit={handleSubmit(submit)}>
                <InputLabel id="email" label="Email" register={register} type="email" errors={errors} />
                <InputLabel id="password" type="password" label="Passwort" register={register} errors={errors} />
                <Button>Login</Button>
            </form>
        </div>
    </>
}

export default SignInNormalUser;