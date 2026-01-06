import { useNavigate, useParams } from "react-router-dom";
import type { EventFormData } from "../components/EventForm";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";

const fetchEventById = async (id: string): Promise<EventFormData> => {
  return {
    title: "Sample Event",
    description: "This is a sample event for editing",
    date: "2025-09-20T10:00",
    location: "Sample Venue",
    category: "workshop",
    capacity: 50,
    banner: null,
  };
};

const updateEvent = async (id: string, data: EventFormData) => {
  console.log("Updating Event", id, data);
  return true;
};

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEventById(id).then((data) => {
        setEventData(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleUpdate = async (data: EventFormData) => {
    if (!id) return;

    await updateEvent(id, data);
    navigate("/events");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10">
      {eventData && (
        <EventForm onSubmit={handleUpdate} initialData={eventData} isEditing />
      )}
    </div>
  );
}
