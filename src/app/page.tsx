"use client"
import Headline from "@/components/self/Headline";
import InputLabel from "@/components/self/InputLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";
import Sidebar from "@/components/self/sidebar";

export default function Home() {
  return (
    <main className="">
      <Sidebar />
    </main>
  );
}
