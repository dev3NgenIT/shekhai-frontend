import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Video } from "lucide-react";

const LiveSessionCard = () => {
  return (
    <Card className="mb-8 border-2 border-dashed border-gray-300 bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-4">
              <Badge className="bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-700">
                <div className="mr-2 h-2 w-2 rounded-full bg-white"></div>
                Live Now
              </Badge>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-1 h-4 w-4" />
                Ends in 25 mins
              </div>
            </div>

            <h2 className="mb-3 text-xl font-semibold text-[#3B5998]">
              Art & Design Brainstorming
            </h2>

            <div className="mb-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">
                  Hosted by Anisur Rahman
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500 p-1">
                <Video className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-gray-700">Zoom Meeting</span>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="mb-3 text-gray-600">Join now to participate!</p>
            <div className="mb-4 flex items-center gap-2 lg:justify-end">
              <div className="flex -space-x-2">
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarImage src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarImage src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm text-gray-600">and 20 others</span>
            </div>
            <Button className="bg-[#3B5998] px-8 py-2 text-white hover:bg-[#2d4373]">
              Join Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveSessionCard;
