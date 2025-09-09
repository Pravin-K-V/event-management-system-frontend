import Button from "@/components/ui/Button";

export default function Playground() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Playground</h1>
      <div className="space-x-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}
