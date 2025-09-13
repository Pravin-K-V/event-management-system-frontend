export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  bannerUrl?: string;
  organizerId: string;
  status: "upcoming" | "ongoing" | "past";
}
