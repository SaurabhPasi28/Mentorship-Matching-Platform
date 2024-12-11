'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", formData);
      console.log("Login successfully ", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup Failed";
      toast.error(errorMessage);
      console.error("Signup Failed: ", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable or disable button based on form completeness
    if (formData.email && formData.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={onLogin} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {loading ? "Processing ..." : "Login"}
            </h2>
                {/* {error && <p className="text-red-500">{error}</p>} */}
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-md"
                    required
                />
                <button
                    type="submit"
                    className={`w-full py-2 rounded text-white transition ${
                        buttonDisabled
                        ? "bg-blue-500 cursor-not-allowed opacity-50"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={buttonDisabled}
                    >
                    {buttonDisabled ? "No Login" : "Login"}
                </button>
                <p className="mt-4">
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-blue-500">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
