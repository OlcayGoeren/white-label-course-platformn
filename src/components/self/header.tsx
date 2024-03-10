
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Boxes } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";

export default function Header() {
    const { data: sessionData } = useSession();

    console.log(sessionData?.user);

    return (
        <div className="supports-backdrop-blur:bg-background/60 sticky left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <Link
                    href={"/"}
                    className="hidden items-center justify-between gap-2 md:flex"
                >
                    <Boxes className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">T3 app template</h1>
                </Link>
                {sessionData?.user &&
                    <div className={cn("block md:!hidden")}>
                        <MobileSidebar />
                    </div>
                }

                <div className="flex items-center gap-2">
                    {sessionData?.user ? (
                        <UserNav user={sessionData.user} />
                    ) : (
                        <Button size="sm"
                            onClick={() => {
                                signIn();
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </nav>
        </div>
    );
}