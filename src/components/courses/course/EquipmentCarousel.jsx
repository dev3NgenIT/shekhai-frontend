import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Link from "next/link";

const StarRating = ({ rating, total }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
    {total && <span className="ml-1 text-sm text-gray-500">({total})</span>}
  </div>
);

export default function EquipmentCarousel({ equipmentItems }) {
  return (
    <Card className="mt-12 border-0 bg-transparent p-0 shadow-none">
      <div className="mb-6">
        <h2 className="mb-0 text-2xl text-gray-900">
          Cattle Handling Equipment & Gear
        </h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-8">
            {equipmentItems.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-8 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none">
                  <div className="relative">
                    <Link href={`/courses/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                      />
                    </Link>
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                      -{product.discount}
                    </Badge>
                  </div>
                  <CardContent className="p-0">
                    <Link
                      href={`/courses/${product.id}`}
                      className="mb-0 font-semibold text-gray-900"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-center justify-between">
                      <span className="text-lg text-base">{product.price}</span>
                      {/* <Button
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add To Cart
                      </Button> */}
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      <StarRating rating={Math.floor(product.rating)} />
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-5 bg-white md:-left-10 md:bg-transparent" />
          <CarouselNext className="-right-5 bg-white md:-right-10 md:bg-transparent" />
        </Carousel>
      </div>
    </Card>
  );
}
