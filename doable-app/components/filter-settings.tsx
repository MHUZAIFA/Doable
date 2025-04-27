"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

export function FilterSettings({ onClose }: { onClose: () => void }) {
    const [isSaving, setIsSaving] = useState(false)
    const [budget, setBudget] = useState([50])

    const handleSave = () => {
        setIsSaving(true)
        // Simulate saving
        setTimeout(() => {
            setIsSaving(false)
            onClose()
        }, 1000)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Filter Settings</CardTitle>
                <CardDescription>Customize your activity filters to find exactly what you're looking for.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Accordion type="multiple" defaultValue={["activity-type", "interest-theme"]}>
                    <AccordionItem value="activity-type" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Activity Type</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="indoor" defaultChecked />
                                    <Label htmlFor="indoor" className="leading-none pt-0.5">
                                        Indoor
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="outdoor" defaultChecked />
                                    <Label htmlFor="outdoor" className="leading-none pt-0.5">
                                        Outdoor
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="adventure" />
                                    <Label htmlFor="adventure" className="leading-none pt-0.5">
                                        Adventure
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="relaxation" />
                                    <Label htmlFor="relaxation" className="leading-none pt-0.5">
                                        Relaxation
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="entertainment" />
                                    <Label htmlFor="entertainment" className="leading-none pt-0.5">
                                        Entertainment
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="cultural" />
                                    <Label htmlFor="cultural" className="leading-none pt-0.5">
                                        Cultural
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="nature-eco" />
                                    <Label htmlFor="nature-eco" className="leading-none pt-0.5">
                                        Nature & Eco-tourism
                                    </Label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="interest-theme" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Interest or Theme</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="historical" />
                                    <Label htmlFor="historical" className="leading-none pt-0.5">
                                        Historical Landmarks
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="food-drink" defaultChecked />
                                    <Label htmlFor="food-drink" className="leading-none pt-0.5">
                                        Food & Drink Experiences
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="wildlife" />
                                    <Label htmlFor="wildlife" className="leading-none pt-0.5">
                                        Wildlife & Nature
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="art-music" />
                                    <Label htmlFor="art-music" className="leading-none pt-0.5">
                                        Art & Music
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="seasonal" />
                                    <Label htmlFor="seasonal" className="leading-none pt-0.5">
                                        Seasonal (Cherry Blossom, Christmas Markets, etc.)
                                    </Label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="activity-level" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Level of Activity</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <RadioGroup defaultValue="moderate">
                                <div className="flex items-start space-x-2">
                                    <RadioGroupItem value="low" id="low" />
                                    <Label htmlFor="low" className="leading-none pt-0.5">
                                        Low Effort (Relaxation, sightseeing)
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="moderate" id="moderate" />
                                    <Label htmlFor="moderate" className="leading-none pt-0.5">
                                        Moderate (Walking tours, yoga, etc.)
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="high" id="high" />
                                    <Label htmlFor="high" className="leading-none pt-0.5">
                                        High (Hiking, water sports, skiing)
                                    </Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="budget" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Budget</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Price Range</Label>
                                        <span className="text-sm font-medium">
                                            {budget[0] === 0 ? "Free" : budget[0] === 100 ? "Premium" : `$${budget[0]}`}
                                        </span>
                                    </div>
                                    <Slider
                                        defaultValue={[50]}
                                        max={100}
                                        step={1}
                                        value={budget}
                                        onValueChange={setBudget}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Free</span>
                                        <span>Low-Cost</span>
                                        <span>Premium</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Budget Options</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                        <div className="flex items-start space-x-2">
                                            <Checkbox id="free" />
                                            <Label htmlFor="free" className="leading-none pt-0.5">
                                                Free Activities
                                            </Label>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <Checkbox id="low-cost" defaultChecked />
                                            <Label htmlFor="low-cost" className="leading-none pt-0.5">
                                                Low-Cost
                                            </Label>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <Checkbox id="premium" />
                                            <Label htmlFor="premium" className="leading-none pt-0.5">
                                                Premium Experiences
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="duration" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Duration</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="short" defaultChecked />
                                    <Label htmlFor="short" className="leading-none pt-0.5">
                                        Short (1–2 hours)
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="half-day" defaultChecked />
                                    <Label htmlFor="half-day" className="leading-none pt-0.5">
                                        Half-Day (3–5 hours)
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="full-day" />
                                    <Label htmlFor="full-day" className="leading-none pt-0.5">
                                        Full-Day or Multi-Day
                                    </Label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="traveler-preferences" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Traveler Preferences</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <RadioGroup defaultValue="couple">
                                <div className="flex items-start space-x-2">
                                    <RadioGroupItem value="solo" id="solo" />
                                    <Label htmlFor="solo" className="leading-none pt-0.5">
                                        Solo
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="couple" id="couple" />
                                    <Label htmlFor="couple" className="leading-none pt-0.5">
                                        Couple
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="family" id="family" />
                                    <Label htmlFor="family" className="leading-none pt-0.5">
                                        Family-Friendly
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="group" id="group" />
                                    <Label htmlFor="group" className="leading-none pt-0.5">
                                        Group Activities
                                    </Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="accessibility" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Accessibility</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="wheelchair" />
                                    <Label htmlFor="wheelchair" className="leading-none pt-0.5">
                                        Wheelchair Accessible
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="child-friendly" defaultChecked />
                                    <Label htmlFor="child-friendly" className="leading-none pt-0.5">
                                        Child-Friendly
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="pet-friendly" />
                                    <Label htmlFor="pet-friendly" className="leading-none pt-0.5">
                                        Pet-Friendly
                                    </Label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="time-of-day" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Time of Day</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="morning" defaultChecked />
                                    <Label htmlFor="morning" className="leading-none pt-0.5">
                                        Morning
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="afternoon" defaultChecked />
                                    <Label htmlFor="afternoon" className="leading-none pt-0.5">
                                        Afternoon
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Checkbox id="evening" />
                                    <Label htmlFor="evening" className="leading-none pt-0.5">
                                        Evening/Night
                                    </Label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="distance" className="border-b">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline">Distance</AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                            <RadioGroup defaultValue="walking">
                                <div className="flex items-start space-x-2">
                                    <RadioGroupItem value="walking" id="walking" />
                                    <Label htmlFor="walking" className="leading-none pt-0.5">
                                        Within Walking Distance
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="short-drive" id="short-drive" />
                                    <Label htmlFor="short-drive" className="leading-none pt-0.5">
                                        Short Drive (1–2 hours)
                                    </Label>
                                </div>
                                <div className="flex items-start space-x-2 mt-2">
                                    <RadioGroupItem value="any" id="any-distance" />
                                    <Label htmlFor="any-distance" className="leading-none pt-0.5">
                                        Any Distance
                                    </Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button
                    onClick={() => {onClose();}}
                    
                    variant="outline"
                    className="transition-all duration-300 hover:shadow-md active:scale-95 mr-3"
                >
                    Cancel
                </Button>
                <Button
                    variant="default"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="transition-all duration-300 hover:shadow-md active:scale-95"
                >
                    {isSaving ? "Applying..." : "Apply"}
                </Button>
            </CardFooter>
        </Card>
    )
}
