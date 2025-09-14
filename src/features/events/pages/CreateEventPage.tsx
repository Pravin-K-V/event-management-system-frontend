import EventForm from "../components/EventForm";
import type { EventFormData } from "../components/EventForm";

export default function CreateEventPage() {
  const handleCreateEvent = (data: EventFormData) => {
    console.log("New Event Data:", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <EventForm onSubmit={handleCreateEvent} />
    </div>
  );
}
