"use client"

import { useState } from "react"
import { User, Bell, Filter, Lock, Sliders } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/animations/fade-in"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { PreferenceQuestionnaire } from "@/components/preference-questionnaire"

export default function SettingsPage() {
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        // Simulate saving
        setTimeout(() => {
            setIsSaving(false)
            toast({
                title: "Settings saved",
                description: "Your settings have been saved successfully.",
            })
        }, 1000)
    }

    return (
        <div className="container py-8">
            <FadeIn direction="down" duration={500}>
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>
            </FadeIn>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    {/* <TabsTrigger value="filters" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </TabsTrigger> */}
                    <TabsTrigger value="account" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="hidden sm:inline">Account</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <FadeIn direction="up" duration={500}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" defaultValue="Alex" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" defaultValue="Smith" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="alex@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input id="bio" defaultValue="Travel enthusiast and food lover." />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save changes"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </FadeIn>

                    <FadeIn direction="up" duration={500} delay={100}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>Set your activity preferences to get personalized recommendations.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => setIsPreferenceModalOpen(true)}
                                    className="w-full sm:w-auto transition-all duration-300 hover:shadow-md active:scale-95"
                                >
                                    <Sliders className="mr-2 h-4 w-4" />
                                    Update Preferences
                                </Button>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <FadeIn direction="up" duration={500}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Configure how you want to be notified.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Email Notifications</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-marketing" className="flex-1">
                                                Marketing emails
                                            </Label>
                                            <Switch id="email-marketing" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-social" className="flex-1">
                                                Social updates
                                            </Label>
                                            <Switch id="email-social" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-events" className="flex-1">
                                                New events and activities
                                            </Label>
                                            <Switch id="email-events" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email-security" className="flex-1">
                                                Security alerts
                                            </Label>
                                            <Switch id="email-security" defaultChecked />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Push Notifications</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="push-all" className="flex-1">
                                                Allow push notifications
                                            </Label>
                                            <Switch id="push-all" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="push-offers" className="flex-1">
                                                Special offers
                                            </Label>
                                            <Switch id="push-offers" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="push-reminders" className="flex-1">
                                                Activity reminders
                                            </Label>
                                            <Switch id="push-reminders" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save preferences"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </FadeIn>
                </TabsContent>

                {/* <TabsContent value="filters">
                    <FadeIn direction="up" duration={500}>
                        <FilterSettings />
                    </FadeIn>
                </TabsContent> */}

                <TabsContent value="account" className="space-y-6">
                    <FadeIn direction="up" duration={500}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>Manage your account security and preferences.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Updating..." : "Update password"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </FadeIn>

                    <FadeIn direction="up" duration={500} delay={100}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                <CardDescription>Irreversible and destructive actions.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-medium">Delete Account</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="destructive">Delete Account</Button>
                            </CardFooter>
                        </Card>
                    </FadeIn>
                </TabsContent>
            </Tabs>

            <PreferenceQuestionnaire open={isPreferenceModalOpen} onOpenChange={setIsPreferenceModalOpen} />
        </div>
    )
}
