import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { packType } from "@/types/pack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentPack, relatedTests } from "@/state/pack";

export const AllPacks = ({ packs }: { packs: packType[] }) => {
    const RenderPacks = () => packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
    ))
    return (
        <div className="grid grid-cols-4 gap-4 p-10 ">
            <RenderPacks />
        </div>
    );
};

const PackCard = ({ pack }: { pack: packType }) => {
    const [tests, setTests] = useRecoilState(relatedTests);
    const setSelectedPack = useSetRecoilState(currentPack);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setSelectedPack(pack)
        const fetchTests = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/pack/tests/${pack.id}`);
                setTests(response.data);
                console.log("once");
            } catch (error) {
                console.error("Failed to fetch tests:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, [pack, setTests, setSelectedPack]);

    return (
        <Card className="w-full max-w-sm relative border border-black p-2 bgreplace">
            <CardHeader className="space-y-1 pb-4">
                <div className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md w-fit absolute -top-3 right-5">
                    {pack.batch}
                </div>
                <CardTitle className="text-2xl font-bold">
                    {pack.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{pack.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-2">
                <Link href={pack.schedule}>
                    <Button variant="outline" className="w-full justify-start bgreplace">
                        <Download className="mr-2 h-4 w-4" />
                        Download Schedule
                    </Button>
                </Link>
                <div className="space-y-1">
                    <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        <span>Full Tests</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        <span> Quizrr Part Tests</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        <span> Chapter-wise Tests & 2024 - 2020 PYQs as Mocks</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between ">
                <Dialog>
                    <DialogTrigger>
                        View Pack
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className="bgreplace">
                            <DialogTitle>Select a pack :</DialogTitle>
                            <Separator />
                            <div className="space-y-4">
                                {loading ? (
                                    <p>Loading tests...</p>
                                ) : tests.length === 0 ? (
                                    <p>No tests available!</p>
                                ) : (
                                    tests.map((test) => (
                                        <div className="flex items-center justify-between p-4 border-b border-gray-700" key={test.id}>
                                            <div className="flex items-center space-x-2">
                                                <Image
                                                    alt="jee main"
                                                    width={10}
                                                    height={10}
                                                    src="https://cdn.quizrr.in/web-assets/icons/exams/jee-main.png"
                                                    className="w-8"
                                                />
                                                <span>{test.title} - {pack.batch}</span>
                                            </div>
                                            <Link href={`/packs/overview`}>
                                                <Button variant="secondary" className="text-sm">
                                                    View Tests
                                                </Button>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Link href={'/payment'}>
                    <Button>Buy Now</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
