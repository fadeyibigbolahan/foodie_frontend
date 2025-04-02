import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAuth } from "../../contexts/AuthContext";

import foodie from "@/assets/foodie.png";
import network from "@/assets/network.jpg";
import { url } from "../../api";

const SigninPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // ✅ Success message state
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // ✅ Clear messages when user types
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError("⚠️ Email and password are required");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${url}users/login-user`, formData);

            const { token } = response.data;
            console.log("Auth user:", response.data);

            // Save token and login user
            localStorage.setItem("token", token);
            login({
                email: response.data.email,
                username: response.data.username,
                role: response.data.role,
                package: response.data.package,
            });

            // ✅ Show success message
            setSuccess("✅ Login successful! Redirecting...");

            // Redirect after a delay
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "❌ Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full flex-col gap-y-4 md:flex-row">
            <div className="hidden h-full w-[60%] items-center justify-center bg-[#F5F6FA] md:flex">
                <div className="w-[60%] shadow-md">
                    <img
                        src={network}
                        alt="Network"
                        style={{ width: "100%", height: "300px" }}
                    />
                </div>
            </div>
            <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
                <div className="flex min-h-screen items-center justify-center">
                    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-8">
                        <img
                            src={foodie}
                            alt="Foodie Logo"
                            style={{ width: "100px" }}
                        />
                        <h2 className="mb-4 text-center text-2xl font-semibold">Welcome Back!</h2>
                        <h2 className="mb-4 text-center text-sm font-semibold text-[#22C55E]">Please sign in to your FWG account</h2>

                        {/* ✅ Display success message */}
                        {success && <p className="mb-2 text-center text-sm text-green-600">{success}</p>}

                        {/* ✅ Display error message */}
                        {error && <p className="mb-2 text-center text-sm text-red-500">{error}</p>}

                        <form
                            onSubmit={handleSubmit}
                            className="w-full"
                        >
                            <div className="mb-4 w-full">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded bg-[#22C55E] py-2 text-white hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                        <p className="mt-4 text-center text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-[#22C55E]"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
