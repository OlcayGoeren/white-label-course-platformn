"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";



export interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  domain: string;
  iban: string;
  accountHolder: string;
}

export const SignUpFormDataSchema: ZodType<SignUpFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8), // Example: Password must be at least 8 characters long
  firstName: z.string().min(1), // Ensuring the string is not empty
  lastName: z.string().min(1), // Ensuring the string is not empty
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Example: YYYY-MM-DD format
  phone: z.string().min(10), // Example: Assuming a minimum length for phone numbers
  domain: z.string().url(), // Validates if the string is a valid URL
  iban: z.string().min(15), // Example: Basic validation for IBAN length
  accountHolder: z.string().min(1), // Ensuring the string is not empty
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormDataSchema)
  })


  function submitData(data: SignUpFormData) {
    alert(JSON.stringify(data, null, 2))
  }


  return (
    <main className="flex flex-col lg:flex-row [&>*]:py-10">
      <div className="hidden lg:flex flex-1 flex-col bg-darkBlue items-center px-10">
        {/* <Image className="w-44" alt="company" width={300} height={100} src={"/brand.png"} /> */}
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
      <div className="flex flex-col gap-10 items-center lg:justify-center lg:pt-0 pt-20 flex-1 xl:flex-col py-14 lg:py-0">
        <div className="flex flex-col justify-center items-center">
          <Image className="lg:hidden w-28 lg:w-auto" alt="company" width={300} height={100} src={"/brand.png"} />
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
            <InputLabel label="Vorname" type="text" id="firstName" register={register} errors={errors} />
            <InputLabel label="Nachname" type="text" id="lastName" register={register} errors={errors} />
            <InputLabel label="Geburtsdatum" type="date" id="birthDate" register={register} errors={errors} />
            <InputLabel label="Telefon" type="tel" id="phone" register={register} errors={errors} />

            <Headline variant="h4">
              Organisation Daten
            </Headline>
            <InputLabel label="Domain" type="text" id="domain" register={register} errors={errors} />
            <InputLabel label="IBAN" type="text" id="iban" register={register} errors={errors} />
            <InputLabel label="Kontoinhaber" type="text" id="accountHolder" register={register} errors={errors} />
            <Headline variant="h4">
              Login Daten
            </Headline>
            <InputLabel label="E-Mail" type="email" id="email" register={register} errors={errors} />
            <InputLabel label="Passwort" type="password" id="password" register={register} errors={errors} />
            <Button className="">Enroll now</Button>
          </section>
        </form>
      </div>
    </main>
  );
}
