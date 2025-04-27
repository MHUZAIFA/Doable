"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"

import { Carousel } from "@/components/carousel"
import { ActivityCard } from "@/components/activity-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { SearchResultsSheet } from "@/components/search-results-sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { AiAssistant } from "@/components/ai-assistant"
import { FilterSettings } from "@/components/filter-settings"
import { Card } from "@/components/ui/card"

// Sample data for activities and restaurants
const popularActivities = [
    {
        title: "Hiking at Mountain Trail",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Mountain View Park",
        rating: 4.7,
        duration: "3 hrs",
        price: "$25 per person",
        type: "Outdoor",
    },
    {
        title: "City Museum Tour",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Downtown",
        rating: 4.5,
        duration: "2 hrs",
        price: "$15 per person",
        type: "Indoor",
    },
    {
        title: "Kayaking Adventure",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Clear Lake",
        rating: 4.8,
        duration: "4 hrs",
        price: "$40 per person",
        type: "Outdoor",
    },
    {
        title: "Wine Tasting Tour",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Vineyard Valley",
        rating: 4.6,
        duration: "3 hrs",
        price: "$35 per person",
        type: "Indoor",
    },
    {
        title: "Bicycle City Tour",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "City Center",
        rating: 4.4,
        duration: "2 hrs",
        price: "$20 per person",
        type: "Outdoor",
    },
]

const indoorActivities = [
    {
        title: "Art Gallery Exhibition",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Modern Art Center",
        rating: 4.3,
        duration: "1.5 hrs",
        price: "$12 per person",
        type: "Indoor",
    },
    {
        title: "Cooking Class: Italian Cuisine",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Culinary Institute",
        rating: 4.9,
        duration: "3 hrs",
        price: "$65 per person",
        type: "Indoor",
    },
    {
        title: "Escape Room Challenge",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Puzzle Palace",
        rating: 4.7,
        duration: "1 hour",
        price: "$25 per person",
        type: "Indoor",
    },
    {
        title: "Pottery Workshop",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Craft Studio",
        rating: 4.5,
        duration: "2 hrs",
        price: "$30 per person",
        type: "Indoor",
    },
    {
        title: "Virtual Reality Experience",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Tech Zone",
        rating: 4.8,
        duration: "1 hour",
        price: "$35 per person",
        type: "Indoor",
    },
]

const outdoorActivities = [
    {
        title: "Zip Line Adventure",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Forest Heights",
        rating: 4.9,
        duration: "2 hrs",
        price: "$45 per person",
        type: "Outdoor",
    },
    {
        title: "Sunset Beach Yoga",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Sandy Beach",
        rating: 4.6,
        duration: "1 hour",
        price: "$15 per person",
        type: "Outdoor",
    },
    {
        title: "Rock Climbing Experience",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Granite Cliffs",
        rating: 4.7,
        duration: "3 hrs",
        price: "$50 per person",
        type: "Outdoor",
    },
    {
        title: "Botanical Garden Tour",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "City Gardens",
        rating: 4.4,
        duration: "1.5 hrs",
        price: "$10 per person",
        type: "Outdoor",
    },
    {
        title: "Horseback Riding Trail",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Valley Ranch",
        rating: 4.8,
        duration: "2 hrs",
        price: "$60 per person",
        type: "Outdoor",
    },
]

const restaurants = [
    {
        title: "The Rustic Table",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Downtown",
        rating: 4.7,
        cuisine: "American",
        priceLevel: "$$$",
    },
    {
        title: "Sakura Sushi",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Eastside",
        rating: 4.8,
        cuisine: "Japanese",
        priceLevel: "$$",
    },
    {
        title: "Olive & Vine",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "Westside",
        rating: 4.6,
        cuisine: "Mediterranean",
        priceLevel: "$$",
    },
    {
        title: "Spice Route",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "North District",
        rating: 4.5,
        cuisine: "Indian",
        priceLevel: "$$",
    },
    {
        title: "El Mariachi",
        image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
        location: "South Plaza",
        rating: 4.4,
        cuisine: "Mexican",
        priceLevel: "$",
    },
]

export default function Dashboard() {
    // Get user's first title (would come from auth in a real app)
    const userName = "Alex"

    const stats = {
        totalTrips: 120,
        avgTripDuration: "3.5 hrs",
        longestTripDuration: "8 hrs",
        uniqueDestinations: 45
    }

    // State for search, filter, and bottom sheet
    const [searchQuery, setSearchQuery] = useState("")
    const [filterValue, setFilterValue] = useState("all")
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Get time of day for greeting
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        if (hour < 18) return "Good afternoon"
        return "Good evening"
    }

    // Function to filter data based on search and filter value
    const filterData = (data: any[]) => {
        return data.filter((item: { title: string; location: string; type: string; cuisine: any }) => {
            const matchesSearchQuery =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesFilter =
                filterValue === "all" ||
                (filterValue === "indoor" && item.type === "Indoor") ||
                (filterValue === "outdoor" && item.type === "Outdoor") ||
                (filterValue === "restaurants" && item.cuisine) // For restaurants filter if needed

            return matchesSearchQuery && matchesFilter
        })
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSheetOpen(true)
    }

    return (
        <div className="container-fluid p-6 space-y-10" style={{ overflowY: "auto", height: "calc(100vh - 130px)", paddingBottom: "70px" }}>
            <FadeIn direction="down" duration={600}>
                <div className="mb-14">
                    <h1 className="text-3xl font-bold animate-in slide-in-from-top duration-500 mb-4">
                        {getGreeting()}, {userName}
                    </h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6 shadow-lg rounded-lg">
                            <p className="text-3xl font-bold">{stats.totalTrips}</p>
                            <h3 className="text-sm mt-2 font-semibold">Trips</h3>
                        </Card>

                        <Card className="p-6 shadow-lg rounded-lg">
                            <p className="text-3xl font-bold">{stats.avgTripDuration}</p>
                            <h3 className="text-sm mt-2 font-semibold">Avg Duration</h3>
                        </Card>

                        <Card className="p-6 shadow-lg rounded-lg">
                            <p className="text-3xl font-bold">{stats.longestTripDuration}</p>
                            <h3 className="text-sm mt-2 font-semibold">Longest Duration</h3>
                        </Card>

                        <Card className="p-6 shadow-lg rounded-lg">
                            <p className="text-3xl font-bold">{stats.uniqueDestinations}</p>
                            <h3 className="text-sm mt-2 font-semibold">Destinations</h3>
                        </Card>
                    </div>
                </div>

                <div className="flex">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search activities..."
                            className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="relative ml-2">
                        <Button
                            variant="outline"
                            type="button"
                            className="w-full sm:w-[90px] transition-all duration-200 hover:border-primary"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            Filter
                        </Button>
                        {isFilterOpen && (
                            <div className="absolute top-full right-0 mt-2" style={{ width: "350px", zIndex: 1000 }}>
                                <FilterSettings onClose={() => setIsFilterOpen(false)} />
                            </div>
                        )}
                    </div>
                </div>
            </FadeIn>

            <StaggerContainer staggerDelay={200}>
                {/* Carousel Render */}
                <Carousel title="Upcoming Trips">
                    {filterData(popularActivities).map((activity, index: React.Key | null | undefined) => (
                        <div key={index} className="snap-start">
                            <ActivityCard {...activity} index={index} />
                        </div>
                    ))}
                </Carousel>
                <AiAssistant isAbsolute={true} />
            </StaggerContainer>

            {/* Search Results Bottom Sheet */}
            <SearchResultsSheet
                isOpen={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
        </div>
    )
}
