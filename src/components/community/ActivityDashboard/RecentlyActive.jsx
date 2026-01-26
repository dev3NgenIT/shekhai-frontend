import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";

const activityPosts = [
  {
    id: "1",
    user: {
      name: "Cameron Williamson",
      avatar: "/api/placeholder/32/32",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 6,
    comments: 5,
    shares: 5,
    timestamp: "8 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Leslie Alexander",
      avatar: "/api/placeholder/32/32",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 2,
    comments: 0,
    shares: 3,
    timestamp: "8 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Ronald Richards",
      avatar: "/api/placeholder/32/32",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 8,
    comments: 2,
    shares: 1,
    timestamp: "8 hours ago",
  },
  {
    id: "4",
    user: {
      name: "Floyd Miles",
      avatar: "/api/placeholder/32/32",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 4,
    comments: 3,
    shares: 0,
    timestamp: "8 hours ago",
  },
  {
    id: "5",
    user: {
      name: "Courtney Henry",
      avatar: "/api/placeholder/32/32",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 2,
    comments: 6,
    shares: 4,
    timestamp: "8 hours ago",
  },
  {
    id: "6",
    user: {
      name: "Darlene Robertson",
      avatar: "/api/placeholder/32/32",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    likes: 7,
    comments: 1,
    shares: 1,
    timestamp: "8 hours ago",
  },
];

export default function RecentlyActive() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recently Active
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityPosts.map((post) => (
          <div
            key={post.id}
            className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            {/* User Header */}
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback className="bg-orange-100 text-xs text-orange-600">
                  {post.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900">
                {post.user.name}
              </span>
            </div>

            {/* Content */}
            <p className="mb-3 ml-11 text-sm leading-relaxed text-gray-600">
              {post.content}
            </p>

            {/* Actions Bar */}
            <div className="ml-11 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 transition-colors hover:text-blue-500">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 transition-colors hover:text-blue-500">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 transition-colors hover:text-blue-500">
                  <Share2 className="h-4 w-4" />
                  <span>{post.shares}</span>
                </button>
              </div>
              <span className="text-xs text-gray-400">{post.timestamp}</span>
            </div>
          </div>
        ))}
      </CardContent>

      {/* <div className="pt-4">
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Show More
        </Button>
      </div> */}
    </Card>
  );
}
