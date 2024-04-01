
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Boxes } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { useGetOrganization } from "../../../hooks/getOrganization";
import { useRouter } from "next/navigation";

export default function Header() {
    const { data: sessionData } = useSession();

    const { data: ogData } = useGetOrganization();
    const router = useRouter();

    function navigateToo() {
        switch (sessionData?.user?.role) {
            case "admin": router.push("/admin/dashboard/courses"); break;
            case "owner": router.push("/admin/dashboard/courses"); break;
            case "user": router.push("/dashboard"); break;
            default: router.push("/");
        }
    }

    return (
        <div className="supports-backdrop-blur:bg-background/60 sticky left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <Button
                    onClick={navigateToo}
                    variant={"ghost"}
                    className="hidden items-center justify-between gap-2 md:flex"
                >
                    <Boxes className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">{ogData?.organization.domain + " Kurse"}</h1>
                </Button>
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