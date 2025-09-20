import type { User } from "@/pages/Admin/sampleData";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useState } from "react";
import { Plus } from "lucide-react";
import SearchBar from "@/features/events/components/SearchBar";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/layouts/Modal";
import Input from "../ui/Input";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAdd: (user: User) => void;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onAdd,
}: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
  }>({});

  const role = users[0].role;

  const filteredUsers = users.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
    );
  });

  const generatePassword = () => Math.random().toString(36).slice(-8);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSave = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone must contain only digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser: User = {
        id: uuidv4(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: generatePassword(),
        role,
      };
      onAdd(newUser);
      setIsModalOpen(false);
      setFormData({ fullName: "", email: "", phone: "" });
      setErrors({});
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-end gap-8">
        <SearchBar
          value={searchTerm}
          placeholder="Search by name, email, or phone"
          onChange={setSearchTerm}
        />
        <Button
          variant="primary"
          className="mr-8"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="-5 h-5 mr-2" /> Add{" "}
          {role === "organizer" ? "Organizer" : "Participant"}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-card rounded-xl shadow-md border border-gray-200 divide-y divide-gray-100">
          <thead className="bg-background rounded-t-xl">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-background transition-colors duration-200"
              >
                <td className="px-6 py-4 text-text-primary font-medium">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 text-text-primary">{user.email}</td>
                <td className="px-6 py-4 text-text-primary">{user.phone}</td>
                <td className="px-6 py-4">
                  <Badge type="outline">{user.role}</Badge>
                </td>
                <td className="px-6 py-4 space-x-2 flex">
                  <Button size="sm" onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-text-secondary text-center mt-32 font-semibold">
            No {role === "organizer" ? "organizers" : "participants"} found
          </p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add ${role === "organizer" ? "Organizer" : "Participant"}`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Full Name
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Email
            </label>
            <Input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Phone
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData({ fullName: "", email: "", phone: "" });
                setIsModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
