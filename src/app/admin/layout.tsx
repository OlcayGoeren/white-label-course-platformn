"use client"

import Header from "@/components/self/header";
import Sidebar from "@/components/self/sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* <Header /> */}
            {/* <div className="flex  border-collapse overflow-hidden"> */}
            {/* <Sidebar /> */}
            {/* <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16  pb-1"> */}
            {/* <div className="flex-1 space-y-4 p-8 pt-6"> */}
            {children}
            {/* </div> */}
            {/* </main> */}
            {/* </div> */}
        </>
    );
}
