import Button from "@/components/ui/Button";
import { EventCard } from "@/features/events/components/EventCard";
import FilterBar from "@/features/events/components/FilterBar";
import SearchBar from "@/features/events/components/SearchBar";
import SortDropDown from "@/features/events/components/SortDropDown";
import EventDetailsModal from "@/features/events/pages/EventDetailsModal";
import Modal from "@/layouts/Modal";
import type { Event } from "@/types/event";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyEvents: Event[] = [
  {
    id: "1",
    title: "React Conference 2025",
    description:
      "Join industry leaders, developers, and tech enthusiasts for an immersive day of talks, workshops, and networking opportunities. Discover the latest trends in web development, React ecosystem updates, and best practices for building modern applications.",
    date: "2025-10-20T10:00:00Z",
    category: "Tech",
    location: "Online",
    status: "upcoming",
    bannerUrl: "",
  },
  {
    id: "2",
    title: "Music Festival",
    description:
      "Experience an unforgettable night of live performances featuring top artists, vibrant stage setups, and a celebration of music across genres. Enjoy food, culture, and the energy of a festival atmosphere.",
    date: "2025-08-15T18:00:00Z",
    category: "Entertainment",
    location: "Bangalore",
    status: "ongoing",

    bannerUrl:
      "https://cdn.pixabay.com/photo/2020/06/29/19/26/piano-5353974_1280.jpg",
  },
  {
    id: "3",
    title: "Art Expo",
    description:
      "Explore breathtaking collections from renowned and emerging artists. The expo showcases paintings, sculptures, digital art, and installations, offering visitors a deep dive into the evolving world of creativity and expression.",
    date: "2025-05-10T09:00:00Z",
    category: "Art",
    location: "Chennai",
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

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deleteEvent, setDeleteEvent] = useState<Event | null>(null);

  const navigate = useNavigate();

  const categories = ["Tech", "Entertainment", "Art"];
  const role: "admin" | "organizer" | "participant" = "admin";

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

  const confirmDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDeleteEvent(null);
  };

  const handleView = (id: string) => {
    const event = events.find((e) => e.id === id) || null;
    setSelectedEvent(event);
  };

  const handleDelete = (id: string) => {
    const event = events.find((e) => e.id === id) || null;
    setDeleteEvent(event);
  };

  const handleEdit = (id: string) => navigate(`/events/${id}/edit`);
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
          {role !== "participant" && (
            <Button
              variant="primary"
              size="md"
              className="ml-8 border"
              onClick={() => navigate("/events/create")}
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Event
            </Button>
          )}
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

      <EventDetailsModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {deleteEvent && (
        <Modal
          isOpen={!!deleteEvent}
          title="Delete Event"
          onClose={() => setDeleteEvent(null)}
        >
          <p className="text-text-secondary mb-4">
            Are you sure want to delete <strong>{deleteEvent.title}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteEvent(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => confirmDelete(deleteEvent.id)}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
