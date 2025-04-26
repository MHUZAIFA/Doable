import Image from "next/image"
import { Clock, MapPin, Star } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScaleIn } from "@/components/animations/scale-in"

interface ActivityCardProps {
  title: string
  image: string
  location: string
  rating: number
  duration?: string
  price?: string
  type?: string
  index?: number
}

export function ActivityCard({ title, image, location, rating, duration, price, type, index = 0 }: ActivityCardProps) {
  // Use a fixed delay based on the index or a small random delay
  const delay = index * 100

  return (
    <ScaleIn delay={delay} duration={400}>
      <Card className="overflow-hidden w-[300px] h-[350px] flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden group">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {type && (
            <Badge className="absolute top-2 left-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              {type}
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          {duration && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
          )}
          <div className="flex items-center mt-2 text-sm">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">{price && <div className="font-semibold">{price}</div>}</CardFooter>
      </Card>
    </ScaleIn>
  )
}
