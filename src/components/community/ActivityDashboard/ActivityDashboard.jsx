import CommunityLeaderboard from "./Leaderboard";
import RecentlyActive from "./RecentlyActive";
import UpcomingEvents from "./UpcomingEvents";

export function ActivityDashboard() {
  return (
    <div className="container-width px-4 pt-[3rem] md:mt-[4.5rem]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recently Active - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2">
          {/* <RecentlyActive /> */}
        </div>

        {/* Right Sidebar - Events and Leaderboard */}
        {/* <div className="space-y-6">
          <UpcomingEvents />
          <CommunityLeaderboard />
        </div> */}
      </div>
    </div>
  );
}
