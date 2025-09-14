import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/layouts/Modal";
import type { Event } from "@/types/event";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  event: Event | null;
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  event,
}: EventDetailsModalProps) {
  if (!event) return null;

  // for testing, in real we need to get from useAuth
  const user = {
    email: "test",
    role: "participant",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event.title} size="lg">
      <div className="space-y-6">
        <div
          className="w-full h-52 bg-gray-200 object-cover rounded-xl flex items-center justify-center 
              text-text-secondary text-sm font-medium overflow-hidden"
        >
          {event.bannerUrl ? (
            <img src={event.bannerUrl} alt={event.title} />
          ) : (
            <span>No preview available</span>
          )}
        </div>

        <p className="text-text-secondary text-lg">{event.description}</p>

        <div className="grid grid-cols-2 items-center">
          <div className="space-y-2 text-md text-text-primary">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString("en-GB")}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
          </div>

          <div className="space-y-2">
            {event.category && (
              <div className="flex justify-end items-center">
                <Badge variant="secondary" type="outline">
                  {event.category}
                </Badge>
              </div>
            )}
            {event.status && (
              <div className="flex justify-end items-center">
                <Badge variant="primary" type="outline">
                  {event.status.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>
        </div>
        <div className="pt-2 flex justify-center gap-6">
          {user?.role === "participant" && event.status === "upcoming" && (
            <Button variant="primary" onClick={() => alert("Registering...")}>
              Register
            </Button>
          )}
          {(user?.role === "organizer" || user?.role === "admin") && (
            <>
              <Button size="md" variant="secondary" onClick={onEdit}>
                Edit
              </Button>

              <Button size="md" variant="danger" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
