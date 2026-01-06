import React, { useState } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Textarea from "./Textarea";
import DatePicker from "./DatePicker";

export interface EventFormData {
  title?: string;
  description?: string;
  date?: string;
}

interface FormProps {
  onSubmit: (data: EventFormData) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<Partial<EventFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<EventFormData> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!date.trim()) newErrors.date = "Date is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ title, description, date });
      setTitle("");
      setDescription("");
      setDate("");
    }
  };

  return (
    <Card header="Create Event">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />
        <Textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <DatePicker
          value={date}
          onChange={(val) => setDate(val)}
          error={!!errors.date}
          helperText={errors.date}
        />
        <Button variant="primary" type="submit">
          Create Event
        </Button>
      </form>
    </Card>
  );
}
