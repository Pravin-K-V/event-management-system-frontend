import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DatePicker from "@/components/ui/DatePicker";
import ImageUpload from "@/components/ui/ImageUpload";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { useState } from "react";

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  capacity: number;
  banner: File | null;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
}

const categories = [
  { value: "workshop", label: "Workshop" },
  { value: "conference", label: "Conference" },
  { value: "meetup", label: "Meetup" },
];

export default function EventForm({ onSubmit }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState<number>(0);
  const [banner, setBanner] = useState<File | null>(null);

  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof EventFormData, string>> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!date.trim()) newErrors.date = "Date is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (capacity <= 0) newErrors.capacity = "Capacity must be greater than 0";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        title,
        description,
        date,
        location,
        category,
        capacity,
        banner,
      });

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCategory("");
      setCapacity(0);
      setBanner(null);
    }
  };

  return (
    <Card header="Create Event">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Event Title
          </label>
          <Input
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
          <label className="block text-sm font-medium text-text-primary">
            Description
          </label>
          <Textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Date & Time
          </label>
          <DatePicker
            value={date}
            onChange={(val) => setDate(val)}
            error={!!errors.date}
            helperText={errors.date}
          />
          <label className="block text-sm font-medium text-text-primary">
            Location
          </label>
          <Input
            placeholder="Event Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={!!errors.location}
            helperText={errors.location}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              Category
            </label>
            <Select
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="Select Category"
              error={!!errors.category}
              helperText={errors.category}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              Capacity
            </label>
            <Input
              type="number"
              placeholder="Max Participants"
              value={capacity.toString()}
              onChange={(e) => setCapacity(Number(e.target.value))}
              error={!!errors.capacity}
              helperText={errors.capacity}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Banner Image
          </label>
          <ImageUpload value={banner} onChange={setBanner} />
        </div>

        <div className="flex justify-center">
          <Button variant="primary" type="submit">
            Create Event
          </Button>
        </div>
      </form>
    </Card>
  );
}
