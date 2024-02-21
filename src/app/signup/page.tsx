"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:flex-row">
      <div className="hidden lg:flex flex-1 flex-col h-screen w-full bg-darkBlue items-center justify-center">
        <Image alt="company" width={300} height={100} src={"/brand.png"} />
      </div>
      <div className="flex flex-col flex-1 items-center">
        <header className="flex flex-col gap-1 lg:gap-4  items-center">
          <Image className="lg:hidden w-32" alt="company" width={300} height={100} src={"/brand.png"} />
          <Headline variant="h1">
            Create an account
          </Headline>
          <Headline variant="sub">
            Already have an account? <Link className="underline" href="/login">Sign in</Link>
          </Headline>
        </header>
        <form className="flex flex-col items-center justify-center gap-3 lg:gap-7 my-10 lg:my-14 lg:w-[40%]">

          <InputLabel label="Name" type="text" />
          <InputLabel label="Birthdate" type="text" />
          <InputLabel label="Telephone" type="tel" />


          <InputLabel label="IBAN" type="text" />
          <InputLabel label="Domain" type="tel" />
          <InputLabel label="Logo" type="file" />



          <InputLabel label="Email" type="email" />
          <InputLabel label="Password" type="password" />
          <InputLabel label="Confirm Password" type="password" />

          <Button className="px-10 mt-7 lg:mt-16">Enroll now</Button>
        </form>
      </div>
    </main>
  );
}
