import Select from "@/components/ui/Select";

interface FilterBarProps {
  status: string;
  category: string;
  onStatusChange: (status: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function FilterBar({
  status,
  category,
  onStatusChange,
  onCategoryChange,
  categories,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={status}
        onChange={onStatusChange}
        options={[
          { value: "all", label: "All Status" },
          { value: "upcoming", label: "Upcoming" },
          { value: "ongoing", label: "Ongoing" },
          { value: "past", label: "Past" },
        ]}
      />

      <Select
        value={category}
        onChange={onCategoryChange}
        options={[
          { value: "all", label: "All Categories" },
          ...categories.map((cat) => ({ value: cat, label: cat })),
        ]}
      />
    </div>
  );
}
