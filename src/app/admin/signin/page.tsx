"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormDataSchema, SignUpFormDataSchema } from "@/types/signUp";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn() {

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
            const result = await signIn(
                "credentials",
                {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                },
                {}
            )

            router.push("/admin/courses");
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        router.push("/dashboard");
    }, [router])


    return (
        <main className="flex min-h-screen flex-col items-center justify-center md:flex-row">
            <div className="hidden lg:flex flex-1 flex-col h-screen w-full bg-darkBlue items-center justify-center">
                <Image alt="company" width={300} height={100} src={"/brand.png"} />
            </div>
            <div className="flex flex-col flex-1 py-10 items-center">
                <header className="flex flex-col gap-1 lg:gap-4  items-center">
                    <Image className="lg:hidden w-32" alt="company" width={300} height={100} src={"/brand.png"} />
                    <Headline variant="h1">
                        Create an account
                    </Headline>
                    <Headline variant="sub">
                        Already have an account? <Link className="underline" href="/login">Sign in</Link>
                    </Headline>
                </header>
                <form onSubmit={handleSubmit(submitData)} className="flex flex-col items-center justify-center gap-3 lg:gap-7 my-10 lg:my-14 lg:w-[40%]">
                    <InputLabel register={register} errors={errors} id={"email"} label="Email" type="email" />
                    <InputLabel register={register} errors={errors} id={"password"} label="Password" type="password" />
                    <Button className="px-10 mt-7 lg:mt-16">Sign in</Button>
                </form>
            </div>
        </main>
    );
}
