"use client"

import Header from "@/components/self/header";
import Sidebar from "@/components/self/sidebar";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="flex  border-collapse overflow-hidden">

                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-2  pb-1">
                    <div className="flex-1  p-8 pt-6">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
