"use client"

import { useState } from "react"
import { Search, Plane, X, Calendar, MapPin, Clock, CheckCircle, CircleDashed } from "lucide-react"

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"

interface TripsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// Sample data for trips
const sampleTrips = [
    {
        id: "trip1",
        title: "Weekend Getaway",
        location: "Mountain View",
        startDate: "May 15, 2023",
        endDate: "May 17, 2023",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "upcoming",
        activities: 5,
        days: 3,
    },
    {
        id: "trip2",
        title: "Summer Vacation",
        location: "Beach Resort",
        startDate: "July 10, 2023",
        endDate: "July 20, 2023",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=3221&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "upcoming",
        activities: 12,
        days: 11,
    },
    {
        id: "trip3",
        title: "City Break",
        location: "New York",
        startDate: "September 5, 2023",
        endDate: "September 8, 2023",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "upcoming",
        activities: 8,
        days: 4,
    },
    {
        id: "trip4",
        title: "Spring Break",
        location: "Miami",
        startDate: "March 10, 2023",
        endDate: "March 15, 2023",
        image: "https://plus.unsplash.com/premium_photo-1683141023289-49fdc6fa7506?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "completed",
        activities: 7,
        days: 6,
    },
    {
        id: "trip5",
        title: "Winter Holiday",
        location: "Aspen",
        startDate: "December 20, 2022",
        endDate: "December 27, 2022",
        image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "completed",
        activities: 9,
        days: 8,
    },
]

export function TripsModal({ open, onOpenChange }: TripsModalProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all")
    const [trips, setTrips] = useState(sampleTrips)

    // Filter trips based on search query and active tab
    const filteredTrips = trips.filter(
        (trip) =>
            (trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trip.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (activeTab === "all" || trip.status === activeTab),
    )

    // Sort trips: upcoming first, then completed
    const sortedTrips = [...filteredTrips].sort((a, b) => {
        if (a.status === "upcoming" && b.status === "completed") return -1
        if (a.status === "completed" && b.status === "upcoming") return 1
        return 0
    })

    const upcomingTrips = filteredTrips.filter((trip) => trip.status === "upcoming")
    const completedTrips = filteredTrips.filter((trip) => trip.status === "completed")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] p-0 gap-0">
                <DialogHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <Plane className="h-5 w-5 text-primary" />
                            My Trips
                        </DialogTitle>
                    </div>
                    <DialogDescription>View and manage your upcoming and past trips.</DialogDescription>
                </DialogHeader>

                <div className="p-6 pt-2 pb-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search trips..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
                        />
                    </div>

                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-3 mb-2">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <ScrollArea className="flex-1 max-h-[60vh] border-t">
                    {sortedTrips.length > 0 ? (
                        <StaggerContainer staggerDelay={100}>
                            <div className="p-6 space-y-6">
                                {activeTab !== "completed" && upcomingTrips.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                                            Upcoming Trips
                                        </h3>
                                        {upcomingTrips.map((trip, index) => (
                                            <FadeIn key={trip.id} direction="up" delay={index * 100} duration={300}>
                                                <div className="flex gap-4 group">
                                                    <div className="relative h-20 w-32 rounded-md overflow-hidden shrink-0">
                                                        <img
                                                            src={trip.image || "/placeholder.svg"}
                                                            alt={trip.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <Badge className="absolute top-1 left-1 text-xs bg-primary text-primary-foreground">
                                                            Upcoming
                                                        </Badge>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <h3 className="font-medium line-clamp-1">{trip.title}</h3>
                                                            <div className="flex items-center gap-1">
                                                                <CircleDashed className="h-4 w-4 text-primary" />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                            <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
                                                            <span className="line-clamp-1">{trip.location}</span>
                                                        </div>
                                                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                            <Calendar className="h-3.5 w-3.5 mr-1 shrink-0" />
                                                            <span>
                                                                {trip.startDate} - {trip.endDate}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <div className="flex items-center text-xs text-muted-foreground">
                                                                <Clock className="h-3.5 w-3.5 mr-1" />
                                                                <span>
                                                                    {trip.days} {trip.days === 1 ? "day" : "days"}, {trip.activities}{" "}
                                                                    {trip.activities === 1 ? "activity" : "activities"}
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 px-3 text-sm transition-all duration-200 hover:bg-primary/10"
                                                            >
                                                                View Trip
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index < upcomingTrips.length - 1 && <Separator className="mt-4" />}
                                            </FadeIn>
                                        ))}
                                    </div>
                                )}

                                {activeTab !== "upcoming" && completedTrips.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                                            Completed Trips
                                        </h3>
                                        {completedTrips.map((trip, index) => (
                                            <FadeIn key={trip.id} direction="up" delay={(upcomingTrips.length + index) * 100} duration={300}>
                                                <div className="flex gap-4 group">
                                                    <div className="relative h-20 w-32 rounded-md overflow-hidden shrink-0">
                                                        <img
                                                            src={trip.image || "/placeholder.svg"}
                                                            alt={trip.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <Badge
                                                            variant="secondary"
                                                            className="absolute top-1 left-1 text-xs bg-muted text-muted-foreground"
                                                        >
                                                            Completed
                                                        </Badge>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between">
                                                            <h3 className="font-medium line-clamp-1">{trip.title}</h3>
                                                            <div className="flex items-center gap-1">
                                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                            <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
                                                            <span className="line-clamp-1">{trip.location}</span>
                                                        </div>
                                                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                            <Calendar className="h-3.5 w-3.5 mr-1 shrink-0" />
                                                            <span>
                                                                {trip.startDate} - {trip.endDate}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <div className="flex items-center text-xs text-muted-foreground">
                                                                <Clock className="h-3.5 w-3.5 mr-1" />
                                                                <span>
                                                                    {trip.days} {trip.days === 1 ? "day" : "days"}, {trip.activities}{" "}
                                                                    {trip.activities === 1 ? "activity" : "activities"}
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 px-3 text-sm transition-all duration-200 hover:bg-primary/10"
                                                            >
                                                                View Trip
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index < completedTrips.length - 1 && <Separator className="mt-4" />}
                                            </FadeIn>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </StaggerContainer>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="rounded-full bg-muted p-3 mb-4">
                                <Plane className="h-6 w-6 text-muted-foreground" />
                            </div>
                            {searchQuery ? (
                                <>
                                    <h3 className="text-lg font-medium">No matching trips</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or create a new trip.</p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-medium">No trips yet</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Start planning your next adventure.</p>
                                    <Button className="mt-4 transition-all duration-300 hover:shadow-md active:scale-95">
                                        Create Trip
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
