import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Modal from "@/layouts/Modal";
import { useState } from "react";

interface ProfilePageType {
  fullName: string;
  role: "admin" | "organizer" | "participant";
  email: string;
  phone?: string;
}

export default function ProfilePage({
  fullName,
  role,
  email,
  phone,
}: ProfilePageType) {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  // Profile form state
  const [formData, setFormData] = useState({
    fullName,
    email,
    phone: phone || "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    console.log("Updated profile:", formData);
    setEditOpen(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    console.log("Password updated:", passwordData.newPassword);

    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto relative top-28">
      <h1 className="text-3xl font-bold text-center text-[var(--color-text-primary)] mb-10">
        My Profile
      </h1>

      <div className="bg-[var(--color-card)] shadow-sm rounded-2xl p-8 space-y-6">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Full Name
          </p>
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {formData.fullName}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">Role</p>
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {role}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">Email</p>
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {formData.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">Phone</p>
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {formData.phone || "Not Provided"}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-3">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setPasswordOpen(true)}
          >
            Change Password
          </Button>
        </div>
      </div>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)}>
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Edit Profile
          </h2>

          <div className="space-y-4">
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <Input
              name="email"
              value={formData.email}
              disabled
              placeholder="Email"
            />

            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveProfile}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={passwordOpen} onClose={() => setPasswordOpen(false)}>
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Change Password
          </h2>

          <div className="space-y-4">
            <PasswordInput
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Old Password"
            />

            <PasswordInput
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />

            <PasswordInput
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setPasswordOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSavePassword}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
