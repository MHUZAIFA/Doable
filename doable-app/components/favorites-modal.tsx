"use client"

import { useState } from "react"
import { Search, Heart, X, Calendar, MapPin, Star, ExternalLink } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"

interface FavoritesModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Sample data for favorites
const sampleFavorites = [
    {
        id: "fav1",
        title: "Mountain Trail Hiking",
        type: "Outdoor Activity",
        location: "Mountain View Park",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "Saved 2 days ago",
    },
    {
        id: "fav2",
        title: "The Rustic Table",
        type: "Restaurant",
        location: "Downtown",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=3221&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "Saved 1 week ago",
    },
    {
        id: "fav3",
        title: "City Museum Tour",
        type: "Indoor Activity",
        location: "City Center",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "Saved 2 weeks ago",
    },
    {
        id: "fav4",
        title: "Kayaking Adventure",
        type: "Water Activity",
        location: "Clear Lake",
        rating: 4.9,
        image: "https://plus.unsplash.com/premium_photo-1683141023289-49fdc6fa7506?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "Saved 3 weeks ago",
    },
    {
        id: "fav5",
        title: "Sakura Sushi",
        type: "Restaurant",
        location: "Eastside",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        date: "Saved 1 month ago",
    },
]

export function FavoritesModal({ open, onOpenChange }: FavoritesModalProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [favorites, setFavorites] = useState(sampleFavorites)

    // Filter favorites based on search query
    const filteredFavorites = favorites.filter(
        (favorite) =>
            favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            favorite.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            favorite.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleRemoveFavorite = (id: string) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== id))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] p-0 gap-0">
                <DialogHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                            Favorites
                        </DialogTitle>
                    </div>
                    <DialogDescription>Your saved activities and restaurants.</DialogDescription>
                </DialogHeader>

                <div className="p-6 pt-2 pb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search favorites..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1 max-h-[60vh] border-t">
                    {filteredFavorites.length > 0 ? (
                        <StaggerContainer staggerDelay={100}>
                            <div className="p-6 space-y-4">
                                {filteredFavorites.map((favorite, index) => (
                                    <FadeIn key={favorite.id} direction="up" delay={index * 100} duration={300}>
                                        <div className="flex gap-4 group">
                                            <div className="relative h-20 w-32 rounded-md overflow-hidden shrink-0">
                                                <img
                                                    src={favorite.image || "/placeholder.svg"}
                                                    alt={favorite.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <Badge
                                                    variant="secondary"
                                                    className="absolute top-1 left-1 text-xs bg-background/80 backdrop-blur-sm"
                                                >
                                                    {favorite.type}
                                                </Badge>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="font-medium line-clamp-1">{favorite.title}</h3>
                                                    <div className="flex items-center gap-1 text-yellow-500">
                                                        <Star className="h-4 w-4 fill-yellow-400" />
                                                        <span className="text-sm">{favorite.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                    <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
                                                    <span className="line-clamp-1">{favorite.location}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                    <Calendar className="h-3.5 w-3.5 mr-1 shrink-0" />
                                                    <span>{favorite.date}</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 text-sm transition-all duration-200 hover:bg-primary/10"
                                                    >
                                                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                                        View Details
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 px-2 text-sm text-destructive transition-all duration-200 hover:bg-destructive/10"
                                                        onClick={() => handleRemoveFavorite(favorite.id)}
                                                    >
                                                        <X className="h-3.5 w-3.5 mr-1" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        {index < filteredFavorites.length - 1 && <Separator className="mt-4" />}
                                    </FadeIn>
                                ))}
                            </div>
                        </StaggerContainer>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="rounded-full bg-muted p-3 mb-4">
                                <Heart className="h-6 w-6 text-muted-foreground" />
                            </div>
                            {searchQuery ? (
                                <>
                                    <h3 className="text-lg font-medium">No matching favorites</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Try adjusting your search or browse for new activities.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-medium">No favorites yet</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Save activities and restaurants to find them here.
                                    </p>
                                    <Button className="mt-4 transition-all duration-300 hover:shadow-md active:scale-95">
                                        Explore Activities
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
