import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, CheckCircle2 } from "lucide-react"
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import { packWithTests } from "@/types/pack";

export default function PackCard({ id, batch, title, subtitle, description, schedule, tests }: packWithTests) {
    const router = useRouter();
    return (
        <Card className="w-full max-w-sm border relative border-black">
            <CardHeader className="space-y-1 pb-4">
                <div className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md w-fit absolute -top-3 right-3">
                    {batch} Batch
                </div>
                <CardTitle className="text-2xl font-bold">
                    <span className="text-xl">{title}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-2">
                <Link href={schedule}>
                    <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Download Schedule
                    </Button>
                </Link>
                <div className="space-y-1">
                    <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        <span>{description}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {tests.length > 0 &&
                    <AlertDialog>
                        <AlertDialogTrigger>View Tests</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{title}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {tests && tests.length > 0 && tests.map((test) => (
                                        <div key={test.id} className="border p-2 flex">
                                            <span className="text-md font-semibold flex-1">{test.title}</span>
                                            <Button className="border border-black" variant={'ghost'}
                                                onClick={() =>
                                                    router.push(`/packs/${id}`)
                                                }
                                            >View Test</Button>
                                        </div>
                                    ))}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        router.push(`/packs/${id}`)
                                    }
                                >view Complete Pack </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                }
                <Button>Buy Now</Button>
            </CardFooter>
        </Card >
    )
}
