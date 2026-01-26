import { Star } from "lucide-react";

export default function StarRating({ rating, total }) {
  return (
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
}
