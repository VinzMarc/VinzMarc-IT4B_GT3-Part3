import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Account() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">Account</h2>
      <p className="mt-2">This is a protected account page.</p>
      <div className="mt-4">
        <button onClick={handleLogout} className="px-3 py-1 bg-gray-200 rounded">Logout</button>
      </div>
    </div>
  );
}
