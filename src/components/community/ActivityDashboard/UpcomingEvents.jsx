const events = [
  {
    id: "1",
    title: "WEBINAR",
    image:
      "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
    type: "webinar",
  },
  {
    id: "2",
    title: "SUNDAY",
    image:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
    type: "event",
  },
];

export default function UpcomingEvents() {
  return (
    <aside className="space-y-4">
      <div className="flex h-[100px] items-center justify-center rounded-2xl bg-base text-white">
        <h2>Upcoming Events</h2>
      </div>

      {events.map((event) => (
        <div
          key={event.id}
          className="relative flex h-[250px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center text-lg font-bold text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${event.image})`,
          }}
        >
          {event.title}
        </div>
      ))}
    </aside>
  );
}
