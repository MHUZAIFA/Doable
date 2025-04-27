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
import { AiAssistant } from "@/components/ai-assistant"
import { FilterSettings } from "@/components/filter-settings"

// Sample data for activities and restaurants
const popularActivities = [
  {
    title: "Hiking at Mountain Trail",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Mountain View Park",
    rating: 4.7,
    duration: "3 hours",
    price: "$25 per person",
    type: "Outdoor",
  },
  {
    title: "City Museum Tour",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Downtown",
    rating: 4.5,
    duration: "2 hours",
    price: "$15 per person",
    type: "Indoor",
  },
  {
    title: "Kayaking Adventure",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Clear Lake",
    rating: 4.8,
    duration: "4 hours",
    price: "$40 per person",
    type: "Outdoor",
  },
  {
    title: "Wine Tasting Tour",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Vineyard Valley",
    rating: 4.6,
    duration: "3 hours",
    price: "$35 per person",
    type: "Indoor",
  },
  {
    title: "Bicycle City Tour",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
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
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Modern Art Center",
    rating: 4.3,
    duration: "1.5 hours",
    price: "$12 per person",
    type: "Indoor",
  },
  {
    title: "Cooking Class: Italian Cuisine",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Culinary Institute",
    rating: 4.9,
    duration: "3 hours",
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
    duration: "2 hours",
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
    duration: "2 hours",
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
    duration: "3 hours",
    price: "$50 per person",
    type: "Outdoor",
  },
  {
    title: "Botanical Garden Tour",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "City Gardens",
    rating: 4.4,
    duration: "1.5 hours",
    price: "$10 per person",
    type: "Outdoor",
  },
  {
    title: "Horseback Riding Trail",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
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
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Downtown",
    rating: 4.7,
    cuisine: "American",
    priceLevel: "$$$",
  },
  {
    name: "Sakura Sushi",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Eastside",
    rating: 4.8,
    cuisine: "Japanese",
    priceLevel: "$$",
  },
  {
    name: "Olive & Vine",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "Westside",
    rating: 4.6,
    cuisine: "Mediterranean",
    priceLevel: "$$",
  },
  {
    name: "Spice Route",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
    location: "North District",
    rating: 4.5,
    cuisine: "Indian",
    priceLevel: "$$",
  },
  {
    name: "El Mariachi",
    image: "https://images.tastet.ca/_/rs:fit:1080:720:false:0/plain/local:///2024/01/oncle-lee-restaurant-chinois-laurier-ouest-8.jpg@jpg",
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
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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
    <div className="container-fluid p-6 space-y-10" style={{ overflowY: "auto", height: "calc(100vh - 130px)", paddingBottom: "70px" }}>
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
            <div className="relative">
              <Button
              variant="outline"
              type="button"
              className="w-full sm:w-[180px] transition-all duration-200 hover:border-primary"
              onClick={() => setIsFilterOpen(true)}
              >
              Filter
              </Button>
              {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 z-10" style={{ width: "350px" }}>
                <FilterSettings />
              </div>
              )}
            </div>
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
