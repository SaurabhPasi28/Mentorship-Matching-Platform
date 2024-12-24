'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'mentee', // Default to mentee
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { username, email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return username.trim() && emailRegex.test(email) && password.length >= 6;
  };

  const onSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", formData);
      // console.log("--------formdata",formData)
      console.log("Signup successfully ", response);
      toast.success("Signup successfully!");
      
      router.push("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup Failed";
      console.error("Signup Failed:-----< ", errorMessage);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!validateForm());
  }, [formData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSignup}
        className="w-full max-w-md bg-white shadow-md rounded px-8 py-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {loading ? "Processing ..." : "Sign Up"}
          {/* Sign Up */}
        </h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            placeholder="Full name"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white transition ${
            buttonDisabled
              ? "bg-blue-500 cursor-not-allowed opacity-50"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
      </form>
    </div>
  );
}
