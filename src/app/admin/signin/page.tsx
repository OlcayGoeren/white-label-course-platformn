"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormDataSchema } from "@/types/signUp";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingIndicator from "@/components/self/LoadingIndicator";

export default function SignIn() {
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ email: string, password: string }>({
        resolver: zodResolver(SignInFormDataSchema)
    })


    async function submitData(data: { email: string, password: string }) {
        try {
            setLoad(true)
            const result = await signIn(
                "credentials",
                {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                },
                {}
            )

            if (result?.ok) {
                router.push("/admin/dashboard/courses");
            } else {
                setError(true)
                setLoad(false)
            }

        } catch (error) {
            setError(true)
            setLoad(false)

        }
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-center md:flex-row">
            {load && <LoadingIndicator />}
            <div className="flex flex-col flex-1 py-10 items-center">
                <header className="flex flex-col gap-1  items-center">
                    <Headline variant="h1">
                        Login Admin
                    </Headline>
                </header>
                <form onSubmit={handleSubmit(submitData)} className="flex flex-col items-center justify-center gap-1  my-10 lg:my-14 lg:w-[40%]">
                    <InputLabel register={register} errors={errors} id={"email"} label="Email" type="email" />
                    <InputLabel register={register} errors={errors} id={"password"} label="Password" type="password" />
                    {error && <p className="text-destructive">Login Daten falsch!</p>}
                    <Button className="px-10 mt-7 lg:mt-16">Sign in</Button>
                </form>
            </div>
        </main>
    );
}
