"use client";
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Headline variant="h1">
        Create an account
      </Headline>
      <Headline variant="sub">
        Already have an account? <Link className="underline" href="/login">Log in</Link>
      </Headline>


    </main>
  );
}
