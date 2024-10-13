import {
    AlertTriangle,
    Bell,
    Book,
    Bookmark,
    Home,
    Package2,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RightPanel() {
    return (
        <div className={`hidden border-r md:block h-screen`}>
            <div className="flex h-full max-h-screen flex-col gap-2 ">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Quizrr</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/home"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Home
                        </Link>
                        <Link
                            href="/packs"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Book className="h-4 w-4" />
                            Packs
                        </Link>
                        <Link
                            href="/tests"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Book className="h-4 w-4" />
                            Tests
                        </Link>
                        <Link
                            href="/notebook"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Bookmark className="h-4 w-4" />
                            Notebooks
                        </Link>
                        <Link
                            href="/results"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            Results
                        </Link>
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4 grid place-content-center w-full">
                    <Button>
                        Help and support
                    </Button>
                </div>
            </div>
        </div>
    )
}