import type { User } from "@/pages/Admin/sampleData";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useState } from "react";
import Input from "../ui/Input";
import { Plus } from "lucide-react";
import SearchBar from "@/features/events/components/SearchBar";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const role = users[0].role;

  const filteredUsers = users.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)
    );
  });

  return (
    <div className="mt-8">
      <div className="mb-4 flex justify-end gap-8">
        <SearchBar
          value={searchTerm}
          placeholder="Search by name, email, or phone"
          onChange={setSearchTerm}
        />
        <Button variant="primary" className="mr-8">
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
    </div>
  );
}
