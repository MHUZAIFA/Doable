import Image from "next/image"
import { MapPin, Star, Utensils } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScaleIn } from "@/components/animations/scale-in"

interface RestaurantCardProps {
  name: string
  image: string
  location: string
  rating: number
  cuisine: string
  priceLevel: string
  index?: number
}

export function RestaurantCard({ name, image, location, rating, cuisine, priceLevel, index = 0 }: RestaurantCardProps) {
  // Use a fixed delay based on the index or a small random delay
  const delay = index * 100

  return (
    <ScaleIn delay={delay} duration={400}>
      <Card className="overflow-hidden w-[300px] h-[350px] flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden group">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-2 left-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
            {cuisine}
          </Badge>
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center mt-2 text-sm">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Utensils className="h-4 w-4 mr-1" />
            <span>{priceLevel}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0"></CardFooter>
      </Card>
    </ScaleIn>
  )
}
