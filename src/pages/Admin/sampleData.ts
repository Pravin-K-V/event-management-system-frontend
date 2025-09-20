export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: "organizer" | "participant";
}

export const sampleOrganizers: User[] = [
  {
    id: "1",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    phone: "9876543210",
    role: "organizer",
  },
  {
    id: "2",
    fullName: "Bob Smith",
    email: "bob@example.com",
    phone: "9876501234",
    role: "organizer",
  },
  {
    id: "3",
    fullName: "Charlie Davis",
    email: "charlie@example.com",
    phone: "9876512345",
    role: "organizer",
  },
];

export const sampleParticipants: User[] = [
  {
    id: "1",
    fullName: "Flavio Denis",
    email: "flavio@example.com",
    phone: "9876512345",
    role: "participant",
  },
  {
    id: "2",
    fullName: "Charlie Davis",
    email: "charlie@example.com",
    phone: "9876543210",
    role: "participant",
  },
  {
    id: "3",
    fullName: "Bob Smith",
    email: "bob@example.com",
    phone: "9876501234",
    role: "participant",
  },
];