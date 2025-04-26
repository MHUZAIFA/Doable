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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"

// Sample data for activities and restaurants
const popularActivities = [
  {
    title: "Hiking at Mountain Trail",
    image: "/placeholder.svg?height=160&width=300",
    location: "Mountain View Park",
    rating: 4.7,
    duration: "3 hours",
    price: "$25 per person",
    type: "Outdoor",
  },
  {
    title: "City Museum Tour",
    image: "/placeholder.svg?height=160&width=300",
    location: "Downtown",
    rating: 4.5,
    duration: "2 hours",
    price: "$15 per person",
    type: "Indoor",
  },
  {
    title: "Kayaking Adventure",
    image: "/placeholder.svg?height=160&width=300",
    location: "Clear Lake",
    rating: 4.8,
    duration: "4 hours",
    price: "$40 per person",
    type: "Outdoor",
  },
  {
    title: "Wine Tasting Tour",
    image: "/placeholder.svg?height=160&width=300",
    location: "Vineyard Valley",
    rating: 4.6,
    duration: "3 hours",
    price: "$35 per person",
    type: "Indoor",
  },
  {
    title: "Bicycle City Tour",
    image: "/placeholder.svg?height=160&width=300",
    location: "City Center",
    rating: 4.4,
    duration: "2 hours",
    price: "$20 per person",
    type: "Outdoor",
  },
]

const indoorActivities = [
  {
    title: "Art Gallery Exhibition",
    image: "/placeholder.svg?height=160&width=300",
    location: "Modern Art Center",
    rating: 4.3,
    duration: "1.5 hours",
    price: "$12 per person",
    type: "Indoor",
  },
  {
    title: "Cooking Class: Italian Cuisine",
    image: "/placeholder.svg?height=160&width=300",
    location: "Culinary Institute",
    rating: 4.9,
    duration: "3 hours",
    price: "$65 per person",
    type: "Indoor",
  },
  {
    title: "Escape Room Challenge",
    image: "/placeholder.svg?height=160&width=300",
    location: "Puzzle Palace",
    rating: 4.7,
    duration: "1 hour",
    price: "$25 per person",
    type: "Indoor",
  },
  {
    title: "Pottery Workshop",
    image: "/placeholder.svg?height=160&width=300",
    location: "Craft Studio",
    rating: 4.5,
    duration: "2 hours",
    price: "$30 per person",
    type: "Indoor",
  },
  {
    title: "Virtual Reality Experience",
    image: "/placeholder.svg?height=160&width=300",
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
    image: "/placeholder.svg?height=160&width=300",
    location: "Forest Heights",
    rating: 4.9,
    duration: "2 hours",
    price: "$45 per person",
    type: "Outdoor",
  },
  {
    title: "Sunset Beach Yoga",
    image: "/placeholder.svg?height=160&width=300",
    location: "Sandy Beach",
    rating: 4.6,
    duration: "1 hour",
    price: "$15 per person",
    type: "Outdoor",
  },
  {
    title: "Rock Climbing Experience",
    image: "/placeholder.svg?height=160&width=300",
    location: "Granite Cliffs",
    rating: 4.7,
    duration: "3 hours",
    price: "$50 per person",
    type: "Outdoor",
  },
  {
    title: "Botanical Garden Tour",
    image: "/placeholder.svg?height=160&width=300",
    location: "City Gardens",
    rating: 4.4,
    duration: "1.5 hours",
    price: "$10 per person",
    type: "Outdoor",
  },
  {
    title: "Horseback Riding Trail",
    image: "/placeholder.svg?height=160&width=300",
    location: "Valley Ranch",
    rating: 4.8,
    duration: "2 hours",
    price: "$60 per person",
    type: "Outdoor",
  },
]

const restaurants = [
  {
    name: "The Rustic Table",
    image: "/placeholder.svg?height=160&width=300",
    location: "Downtown",
    rating: 4.7,
    cuisine: "American",
    priceLevel: "$$$",
  },
  {
    name: "Sakura Sushi",
    image: "/placeholder.svg?height=160&width=300",
    location: "Eastside",
    rating: 4.8,
    cuisine: "Japanese",
    priceLevel: "$$",
  },
  {
    name: "Olive & Vine",
    image: "/placeholder.svg?height=160&width=300",
    location: "Westside",
    rating: 4.6,
    cuisine: "Mediterranean",
    priceLevel: "$$",
  },
  {
    name: "Spice Route",
    image: "/placeholder.svg?height=160&width=300",
    location: "North District",
    rating: 4.5,
    cuisine: "Indian",
    priceLevel: "$$",
  },
  {
    name: "El Mariachi",
    image: "/placeholder.svg?height=160&width=300",
    location: "South Plaza",
    rating: 4.4,
    cuisine: "Mexican",
    priceLevel: "$",
  },
]

export default function Dashboard() {
  // Get user's first name (would come from auth in a real app)
  const userName = "Alex"

  // State for search and bottom sheet
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Open the bottom sheet with search results
    setIsSheetOpen(true)
  }

  return (
    <div className="container py-8 space-y-10">
      <FadeIn direction="down" duration={600}>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold animate-in slide-in-from-top duration-500">
            {getGreeting()}, {userName}
          </h1>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search activities, restaurants, locations..."
                className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200 hover:border-primary">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="indoor">Indoor Only</SelectItem>
                <SelectItem value="outdoor">Outdoor Only</SelectItem>
                <SelectItem value="restaurants">Restaurants</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="transition-all duration-300 hover:shadow-md active:scale-95">
              Search
            </Button>
          </form>
        </div>
      </FadeIn>

      <StaggerContainer staggerDelay={200}>
        <Carousel title="Popular Activities Nearby">
          {popularActivities.map((activity, index) => (
            <div key={index} className="snap-start">
              <ActivityCard {...activity} index={index} />
            </div>
          ))}
        </Carousel>

        <Carousel title="Popular Indoor Activities">
          {indoorActivities.map((activity, index) => (
            <div key={index} className="snap-start">
              <ActivityCard {...activity} index={index} />
            </div>
          ))}
        </Carousel>

        <Carousel title="Popular Outdoor Activities">
          {outdoorActivities.map((activity, index) => (
            <div key={index} className="snap-start">
              <ActivityCard {...activity} index={index} />
            </div>
          ))}
        </Carousel>

        <Carousel title="Popular Restaurants Nearby">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="snap-start">
              <RestaurantCard {...restaurant} index={index} />
            </div>
          ))}
        </Carousel>
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
