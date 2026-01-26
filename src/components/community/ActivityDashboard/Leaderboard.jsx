"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

const leaderboardData = [
  {
    rank: 1,
    user: {
      name: "Ronald Richards",
      avatar: "/api/placeholder/32/32",
    },
    points: 700,
    badge: "gold",
  },
  {
    rank: 2,
    user: {
      name: "Jerome Bell",
      avatar: "/api/placeholder/32/32",
    },
    points: 640,
    badge: "silver",
  },
  {
    rank: 3,
    user: {
      name: "Brooklyn Simmons",
      avatar: "/api/placeholder/32/32",
    },
    points: 500,
    badge: "bronze",
  },
  {
    rank: 4,
    user: {
      name: "Ralph Edwards",
      avatar: "/api/placeholder/32/32",
    },
    points: 350,
  },
  {
    rank: 5,
    user: {
      name: "Darlene Robertson",
      avatar: "/api/placeholder/32/32",
    },
    points: 300,
  },
  {
    rank: 6,
    user: {
      name: "Leslie Alexander",
      avatar: "/api/placeholder/32/32",
    },
    points: 250,
  },
  {
    rank: 7,
    user: {
      name: "Robert Fox",
      avatar: "/api/placeholder/32/32",
    },
    points: 200,
  },
];

export default function CommunityLeaderboard() {
  const [dateFilter, setDateFilter] = useState("week");

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Community Expert Leaderboard
          </CardTitle>
        </div>

        <div className="mt-2 flex gap-4 text-sm">
          <button
            className={cn(
              "pb-1 font-medium",
              dateFilter === "week"
                ? "border-b-2 border-base pb-1 font-medium text-base"
                : "text-gray-500 hover:text-gray-700",
            )}
            onClick={() => setDateFilter("week")}
          >
            This Week
          </button>
          <button
            className={cn(
              "pb-1 font-medium",
              dateFilter === "all"
                ? "border-b-2 border-base pb-1 font-medium text-base"
                : "text-gray-500 hover:text-gray-700",
            )}
            onClick={() => setDateFilter("all")}
          >
            All Time
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboardData.map((entry) => (
          <div key={entry.rank} className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center text-sm font-medium text-gray-600">
              {entry.rank}
            </div>

            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                <AvatarFallback className="bg-orange-100 text-xs text-orange-600">
                  {entry.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {entry.user.name}
              </p>
              <p className="text-xs text-gray-500">{entry.points} Points</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
