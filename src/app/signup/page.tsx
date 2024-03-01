"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, SignUpFormDataSchema } from "@/types/signUp";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp() {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>(
    {
      resolver: zodResolver(SignUpFormDataSchema)
    }
  )


  async function submitData(data: SignUpFormData) {
    try {
      await axios.post('/api/signup', data);
      // Signup success --> Login
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

    }

  }


  return (
    <main className="flex flex-col lg:flex-row [&>*]:py-10 h-screen">
      <div className="hidden lg:flex flex-1 flex-col bg-darkBlue items-center px-10">
        <div className="text-center flex flex-col gap-3">
          <Headline variant="h2" color="white">
            LernLab - Die Zukunft des lernens
          </Headline>
          <section className="text-lightGray text-lg">
            EduPulse Online bietet eine revolutionäre White-Label-Plattform, die es Dozenten, Trainern und Bildungsexperten ermöglicht,
            ihre eigene Online-Lerncommunity zu kreieren und zu verwalten.
            Unsere Plattform dient als Ihr persönliches Sprungbrett, um Ihre Marke zu etablieren,
            Ihre Kurse anzubieten und eine engagierte Lerngemeinschaft aufzubauen. Mit EduPulse Online haben Sie die Freiheit und die Werkzeuge,
            um Ihre Vision eines personalisierten Lernumfelds Wirklichkeit werden zu lassen.
          </section>
          <ul className="list-disc text-lightGray text-lg">
            <li>Vollständige Markenanpassung: Gestalten Sie Ihre Lernplattform so, dass sie Ihre Marke widerspiegelt. Von Logos bis hin zu Farbschemata – Ihre Plattform, Ihre Identität.</li>
            <li>Eigenständige Community-Bildung: Nutzen Sie unsere Tools, um Ihre eigene Community zu schaffen und zu verwalten. Binden Sie Ihre Lernenden durch Foren, Diskussionen und Gruppeninteraktionen.</li>
            <li>Einfaches Kursmanagement: Mit unserem intuitiven Dashboard können Sie Kurse erstellen, verwalten und aktualisieren, Teilnehmer verfolgen und Feedback in Echtzeit sammeln.</li>
            <li>Flexibilität & Skalierbarkeit: Egal, ob Sie gerade erst anfangen oder bereits eine etablierte Marke sind – unsere Plattform wächst mit Ihren Bedürfnissen.</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center lg:pt-0 flex-1 xl:flex-col ">
        <div className="flex flex-col justify-center items-center">
          <Headline variant="h1">
            Create an Account
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
              Organisation Daten
            </Headline>
            <InputLabel errors={errors} label="Domain" type="text" id="domain" register={register} />
            <InputLabel errors={errors} label="IBAN" type="text" id="iban" register={register} />
            <InputLabel errors={errors} label="Kontoinhaber" type="text" id="accountOwner" register={register} />
            <Headline variant="h4">
              Login Datenn
            </Headline>
            <InputLabel errors={errors} label="E-Mail" type="email" id="email" register={register} />
            <InputLabel errors={errors} label="Passwort" type="password" id="password" register={register} />
            <Button className="">Enroll now</Button>
          </section>
        </form>
      </div>
    </main>
  );
}
