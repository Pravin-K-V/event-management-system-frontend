import { EventCard } from "@/features/events/components/EventCard";
import FilterBar from "@/features/events/components/FilterBar";
import SearchBar from "@/features/events/components/SearchBar";
import SortDropDown from "@/features/events/components/SortDropDown";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";

const dummyEvents: Event[] = [
  {
    id: "1",
    title: "React Conference 2025",
    date: "2025-10-20T10:00:00Z",
    category: "Tech",
    status: "upcoming",
    bannerUrl:
      "https://cdn.pixabay.com/photo/2018/04/20/21/10/code-3337044_1280.jpg",
  },
  {
    id: "2",
    title: "Music Festival",
    date: "2025-08-15T18:00:00Z",
    category: "Entertainment",
    status: "ongoing",
    bannerUrl:
      "https://cdn.pixabay.com/photo/2020/06/29/19/26/piano-5353974_1280.jpg",
  },
  {
    id: "3",
    title: "Art Expo",
    date: "2025-05-10T09:00:00Z",
    category: "Art",
    status: "past",
    bannerUrl:
      "https://cdn.pixabay.com/photo/2012/03/02/00/35/shanghai-20769_1280.jpg",
  },
  // Add more as needed
];

export default function EventListingPage() {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(dummyEvents);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("date");

  const categories = ["Tech", "Entertainment", "Art"];
  const role: "admin" | "organizer" | "participant" = "participant";

  useEffect(() => {
    let temp = [...events];

    if (status !== "all") {
      temp = temp.filter((e) => e.status === status);
    }

    if (category !== "all") {
      temp = temp.filter((e) => e.category === category);
    }

    if (search.trim() !== "") {
      temp = temp.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort === "date") {
      temp.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    } else if (sort === "date-desc") {
      temp.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    setFilteredEvents(temp);
  }, [search, status, category, sort, events]);

  const handleView = (id: string) => alert(`View event id: ${id}`);
  const handleEdit = (id: string) => alert(`Edit event id: ${id}`);
  const handleDelete = (id: string) => alert(`Delete event id: ${id}`);
  const handleRegister = (id: string) => alert(`Register event id: ${id}`);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex flex-wrap gap-4">
          <FilterBar
            status={status}
            category={category}
            onStatusChange={setStatus}
            onCategoryChange={setCategory}
            categories={categories}
          />
          <SortDropDown value={sort} onChange={setSort} />
        </div>
      </div>
      {filteredEvents.length === 0 ? (
        <p className="text-text-secondary text-center mt-10">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              role={role}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRegister={handleRegister}
            />
          ))}
        </div>
      )}
    </div>
  );
}
