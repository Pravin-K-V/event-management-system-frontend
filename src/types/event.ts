export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  category: string;
  bannerUrl: string;
  organizerId?: string;
  status: "upcoming" | "ongoing" | "past";
}
