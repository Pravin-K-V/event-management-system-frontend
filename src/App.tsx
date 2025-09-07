import { useState } from "react";
import Input from "./components/ui/Input";

const App = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="p-10 max-w-md">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        type="email"
        disabled
      />
    </div>
  );
};

export default App;
