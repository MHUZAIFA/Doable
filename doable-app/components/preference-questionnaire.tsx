"use client"

import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { FadeIn } from "@/components/animations/fade-in"

interface PreferenceQuestionnaireProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const steps = [
    {
        id: "indoor",
        title: "Indoor Activities",
        description: "Select the indoor activities you enjoy.",
        categories: [
            {
                name: "Cultural & Artistic",
                options: [
                    { id: "museums", label: "Museums & Art Galleries" },
                    { id: "live-shows", label: "Live Shows/Theater" },
                    { id: "movie-tours", label: "Movie Tours (Famous Filming Locations)" },
                    { id: "pottery", label: "Pottery/Art Workshops" },
                    { id: "music-dance", label: "Local Music & Dance Performances" },
                ],
            },
            {
                name: "Relaxation & Wellness",
                options: [
                    { id: "spa", label: "Spa/Wellness Retreats" },
                    { id: "yoga", label: "Yoga Classes" },
                    { id: "meditation", label: "Meditation Sessions" },
                    { id: "cooking", label: "Cooking Classes" },
                ],
            },
            {
                name: "Entertainment",
                options: [
                    { id: "arcades", label: "Gaming Arcades" },
                    { id: "escape-rooms", label: "Escape Rooms" },
                    { id: "bowling", label: "Bowling Alleys" },
                ],
            },
            {
                name: "Shopping & Social",
                options: [
                    { id: "shopping", label: "Shopping (Local Markets or Malls)" },
                    { id: "nightlife", label: "Nightlife (Bars/Clubs)" },
                    { id: "culinary", label: "Culinary Experiences (Food Tours, Tasting Events)" },
                ],
            },
        ],
    },
    {
        id: "outdoor",
        title: "Outdoor Activities",
        description: "Select the outdoor activities you enjoy.",
        categories: [
            {
                name: "Adventure & Exploration",
                options: [
                    { id: "hiking", label: "Hiking/Trekking" },
                    { id: "wildlife", label: "Wildlife Safari" },
                    { id: "rock-climbing", label: "Rock Climbing" },
                    { id: "camping", label: "Camping" },
                ],
            },
            {
                name: "Water-Based Activities",
                options: [
                    { id: "beaches", label: "Beaches & Sunbathing" },
                    { id: "water-sports", label: "Water Sports (Surfing, Kayaking, Rafting)" },
                    { id: "snorkeling", label: "Snorkeling/Scuba Diving" },
                ],
            },
            {
                name: "Nature & Eco-Tourism",
                options: [
                    { id: "parks", label: "National Parks & Nature Trails" },
                    { id: "bird-watching", label: "Bird Watching" },
                    { id: "stargazing", label: "Stargazing" },
                    { id: "geo-wonders", label: "Geographical Wonders (Caves, Waterfalls, etc.)" },
                ],
            },
            {
                name: "Leisure & Seasonal",
                options: [
                    { id: "scenic-drives", label: "Scenic Drives" },
                    { id: "cherry-blossom", label: "Cherry Blossom Viewing" },
                    { id: "fall-foliage", label: "Fall Foliage Tours" },
                    { id: "skiing", label: "Skiing/Snowboarding" },
                ],
            },
            {
                name: "Entertainment & Adventure",
                options: [
                    { id: "theme-parks", label: "Theme Parks & Amusement Parks" },
                    { id: "hot-air", label: "Hot Air Ballooning" },
                    { id: "glamping", label: "Glamping" },
                ],
            },
        ],
    },
    {
        id: "food",
        title: "Food & Restaurant Preferences",
        description: "Tell us about your culinary preferences.",
        categories: [
            {
                name: "Cuisine Types",
                options: [
                    { id: "italian", label: "Italian" },
                    { id: "asian", label: "Asian (Chinese, Japanese, Thai)" },
                    { id: "mexican", label: "Mexican" },
                    { id: "mediterranean", label: "Mediterranean" },
                    { id: "middle-eastern", label: "Middle Eastern" },
                    { id: "indian", label: "Indian" },
                    { id: "french", label: "French" },
                    { id: "american", label: "American" },
                    { id: "seafood", label: "Seafood" },
                    { id: "bbq", label: "BBQ & Grilled" },
                ],
            },
            {
                name: "Dining Style",
                options: [
                    { id: "casual", label: "Casual Dining" },
                    { id: "fine-dining", label: "Fine Dining" },
                    { id: "fast-casual", label: "Fast Casual" },
                    { id: "street-food", label: "Street Food" },
                    { id: "buffet", label: "Buffet" },
                    { id: "food-trucks", label: "Food Trucks" },
                    { id: "cafes", label: "Cafés & Bakeries" },
                ],
            },
            {
                name: "Dietary Preferences",
                options: [
                    { id: "vegetarian", label: "Vegetarian" },
                    { id: "vegan", label: "Vegan" },
                    { id: "gluten-free", label: "Gluten-Free" },
                    { id: "organic", label: "Organic/Farm-to-Table" },
                    { id: "halal", label: "Halal" },
                    { id: "kosher", label: "Kosher" },
                    { id: "keto", label: "Keto-Friendly" },
                ],
            },
            {
                name: "Restaurant Ambiance",
                options: [
                    { id: "romantic", label: "Romantic" },
                    { id: "family", label: "Family-Friendly" },
                    { id: "trendy", label: "Trendy & Hip" },
                    { id: "quiet", label: "Quiet & Intimate" },
                    { id: "outdoor", label: "Outdoor Seating" },
                    { id: "view", label: "Scenic View" },
                    { id: "live-music", label: "With Live Music" },
                ],
            },
        ],
    },
]

export function PreferenceQuestionnaire({ open, onOpenChange }: PreferenceQuestionnaireProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedPreferences, setSelectedPreferences] = useState<Record<string, boolean>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedPreferences((prev) => ({
            ...prev,
            [id]: checked,
        }))
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
        } else {
            handleSubmit()
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleSubmit = () => {
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            onOpenChange(false)
            toast({
                title: "Preferences saved",
                description: "Your activity preferences have been updated successfully.",
            })
            // Reset for next time
            setCurrentStep(0)
        }, 1500)
    }

    const currentStepData = steps[currentStep]
    const isLastStep = currentStep === steps.length - 1

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Activity Preferences</DialogTitle>
                    <DialogDescription>
                        Tell us what you enjoy so we can recommend activities tailored to your interests.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4" style={{ overflowY: "auto", height: "60vh", paddingRight: "20px"}}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">{currentStepData.title}</h3>
                        <div className="text-sm text-muted-foreground">
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">{currentStepData.description}</p>

                    <FadeIn key={currentStepData.id} direction="up" duration={300}>
                        <div className="space-y-6">
                            {currentStepData.categories.map((category) => (
                                <div key={category.name} className="space-y-3">
                                    <h4 className="font-medium">{category.name}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {category.options.map((option) => (
                                            <div key={option.id} className="flex items-start space-x-2">
                                                <Checkbox
                                                    id={option.id}
                                                    checked={selectedPreferences[option.id] || false}
                                                    onCheckedChange={(checked) => handleCheckboxChange(option.id, checked === true)}
                                                    className="transition-all duration-200"
                                                />
                                                <Label
                                                    htmlFor={option.id}
                                                    className="leading-none pt-0.5 cursor-pointer transition-colors duration-200 hover:text-primary"
                                                >
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="my-2" />
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <div className="flex gap-2">
                        {currentStep > 0 && (
                            <Button type="button" variant="outline" onClick={handlePrevious} className="transition-all duration-200">
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Back
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="transition-all duration-200"
                        >
                            <X className="mr-1 h-4 w-4" />
                            Cancel
                        </Button>
                    </div>
                    <Button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="transition-all duration-300 hover:shadow-md active:scale-95"
                    >
                        {isSubmitting ? (
                            "Saving..."
                        ) : isLastStep ? (
                            <>
                                <Check className="mr-1 h-4 w-4" />
                                Save Preferences
                            </>
                        ) : (
                            <>
                                Next
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
