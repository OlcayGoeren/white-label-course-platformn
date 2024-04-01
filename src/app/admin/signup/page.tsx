"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormDataSchema } from "@/types/signUp";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingIndicator from "@/components/self/LoadingIndicator";

export default function SignUp() {

  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormDataSchema>(
    {
      resolver: zodResolver(SignUpFormDataSchema)
    }
  )


  async function submitData(data: SignUpFormDataSchema) {
    try {
      setLoading(true)
      await axios.post('/api/signup', data);
      await signIn(
        "credentials",
        {
          redirect: false,
          email: data.email,
          password: data.password,
        },
        {}
      )
      router.push("/dashboard");

    } catch (error) {
      setLoading(false)
    }
  }


  return (
    <main className="flex flex-col lg:flex-row [&>*]:py-10 h-screen">
      {loading && <LoadingIndicator />}
      <div className="flex flex-col gap-10 items-center lg:pt-0 flex-1 xl:flex-col ">
        <div className="flex flex-col justify-center items-center">
          <Headline variant="h1">
            Registrieren Admin
          </Headline>
          <Headline variant="sub">
            Already have an account? <Link className="underline" href="/signin">Sign in</Link>
          </Headline>
        </div>
        <form onSubmit={handleSubmit(submitData)}>
          <section className="flex flex-col justify-center gap-2">
            <Headline variant="h4">
              Persönliche Daten
            </Headline>
            <InputLabel errors={errors} label="Vorname" type="text" id="forname" register={register} />
            <InputLabel errors={errors} label="Nachname" type="text" id="surname" register={register} />
            <InputLabel errors={errors} label="Geburtsdatum" type="text" id="birthDate" register={register} />
            <InputLabel errors={errors} label="Telefon" type="tel" id="telephone" register={register} />

            <Headline variant="h4">
              Firmen Daten
            </Headline>
            <InputLabel errors={errors} label="Domain" type="text" id="domain" register={register} />
            <InputLabel errors={errors} label="IBAN" type="text" id="iban" register={register} />
            <InputLabel errors={errors} label="Kontoinhaber" type="text" id="accountOwner" register={register} />
            <Headline variant="h4">
              Login Datenn
            </Headline>
            <InputLabel errors={errors} label="E-Mail" type="email" id="email" register={register} />
            <InputLabel errors={errors} label="Passwort" type="password" id="password" register={register} />
            <Button className="">Jetzt registrieren</Button>
          </section>
        </form>
      </div>
    </main>
  );
}
