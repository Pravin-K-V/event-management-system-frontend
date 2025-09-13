import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Event } from "@/types/event";
import { Calendar, CheckCircle, Clock, Info } from "lucide-react";

interface EventCardProps {
  event: Event;
  role: "admin" | "organizer" | "participant";
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRegister: (id: string) => void;
}

export function EventCard({
  event,
  role,
  onView,
  onEdit,
  onDelete,
  onRegister,
}: EventCardProps) {
  const renderStatusIcon = () => {
    switch (event.status) {
      case "upcoming":
        return <Clock className="h-3 w-3 mr-1 inline" />;
      case "ongoing":
        return <Info className="h-3 w-3 mr-1 inline" />;
      case "past":
        return <CheckCircle className="h-3 w-3 mr-1 inline" />;
    }
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-card group">
      <div
        className="w-full h-48 bg-gray-200 flex items-center justify-center 
              text-[var(--color-text-secondary)] text-sm font-medium overflow-hidden"
      >
        {event.bannerUrl ? (
          <img
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            src={event.bannerUrl}
            alt={event.title}
          />
        ) : (
          <span>No preview available</span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-text-primary">
          {event.title}
        </h3>
        <div className="mt-2 text-text-secondary text-sm flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(event.date).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <Badge type="outline" variant="secondary">
            {event.category}
          </Badge>
          <Badge type="outline">
            {renderStatusIcon()}
            {event.status.toUpperCase()}
          </Badge>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <Button
            size="md"
            variant="primary"
            onClick={() => onView?.(event.id)}
          >
            View Details
          </Button>

          {role === "participant" && event.status === "upcoming" && (
            <Button
              size="md"
              variant="secondary"
              onClick={() => onRegister?.(event.id)}
            >
              Register
            </Button>
          )}

          {(role === "organizer" || role === "admin") && (
            <>
              <Button
                size="md"
                variant="secondary"
                onClick={() => onEdit?.(event.id)}
              >
                Edit
              </Button>

              <Button
                size="md"
                variant="danger"
                onClick={() => onDelete?.(event.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
