import Select from "@/components/ui/Select";

interface SortDropDownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropDown({ value, onChange }: SortDropDownProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={[
        { value: "date", label: "Date (Soonest First)" },
        { value: "date-desc", label: "Date (Latest First)" },
        { value: "recent", label: "Recently Added" },
        { value: "popularity", label: "Popularity" },
      ]}
    />
  );
}
