import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-blue-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/MLP.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content box */}
      <div className="relative z-10 bg-white p-8 rounded-xl w-96 shadow-xl">
        {/* Prime Video Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"
            alt="Prime Video"
            className="h-10"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        {/* Register link */}
        <p className="text-gray-600 mt-4 text-center">
          New to Prime Video?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
+