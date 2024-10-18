"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Mail, Phone, MapPin } from "lucide-react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch"

export default function Component() {
    const { data: session, status } = useSession();
    const router = useRouter()

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (!session) {
        router.push("/");
        return null;
    }
    return (
        <div className="min-h-screen bg-white p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Account</h1>
                    <Button variant="outline">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
                <Tabs defaultValue="profile" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-bold">Overview</CardTitle>
                                <Button>Edit Profile</Button>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarFallback className="text-4xl">V</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Mail className="mr-2 h-4 w-4" />
                                            {session?.user?.email}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Phone className="mr-2 h-4 w-4" />
                                            +0000000000
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            localhost:3000
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Board</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Central Board of Secondary Education (CBSE)</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Class</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Class 12</div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <SettingItem
                                    title="Dark Mode"
                                    description="Color scheme of your Quizrr app"
                                    defaultChecked={false}
                                />
                                <SettingItem
                                    title="Scorecard Emails"
                                    description="Receive email of the scorecard when you submit a test."
                                    defaultChecked={true}
                                />
                                <SettingItem
                                    title="Generic Emails"
                                    description="Receive emails of new test series, discounts etc."
                                    defaultChecked={false}
                                />
                                <SettingItem
                                    title="Important Push Notifications"
                                    description="Receive notifications related to your purchased packs like upcoming test, result declaration etc."
                                    defaultChecked={false}
                                />
                                <SettingItem
                                    title="Generic Push Notifications"
                                    description="Receive notifications of new test series, discounts etc."
                                    defaultChecked={false}
                                />
                                <SettingItem
                                    title="Disable Predicted Percentile/Rank"
                                    description="On disabling this option, we won't show you your predicted percentile or rank wherever applicable."
                                    defaultChecked={false}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


function SettingItem({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <Label htmlFor={title} className="text-base font-medium text-gray-900">
                    {title}
                </Label>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <Switch id={title} defaultChecked={defaultChecked} />
        </div>
    )
}