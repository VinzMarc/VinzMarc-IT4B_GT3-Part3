import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [name, setName] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simulate a token
    login("demo-token");
    navigate("/", { replace: true });
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} className="block mt-1 border rounded px-2 py-1" />
        </label>
        <div>
          <button type="submit" className="px-3 py-1 bg-gray-200 rounded">Sign in</button>
        </div>
      </form>
    </div>
  );
}
