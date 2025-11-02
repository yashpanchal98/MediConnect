import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // ✅ Submit handler for Login / Signup
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        // 🔹 Register API
        const response = await axiosInstance.post("/api/v1/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Account created successfully!");
          setState("Login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // 🔹 Login API
        const response = await axiosInstance.post("/api/v1/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Login successful!");
          localStorage.setItem("token", response.data.token);

          // 🔥 Tell Navbar that the token has changed
          window.dispatchEvent(new Event("tokenChanged"));

          navigate("/"); // optional redirect
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ If token already exists, redirect user to home page
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <p className="text-2xl font-bold text-gray-800 text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-600 text-center mt-2">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book appointments
        </p>

        <div className="mt-6 space-y-4">
          {state === "Sign Up" && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Full Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;