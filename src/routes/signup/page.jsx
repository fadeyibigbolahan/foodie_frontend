import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import logoLight from "@/assets/logo-light.svg";
import foodie from "@/assets/foodie.png";
import network from "@/assets/network.jpg";
import { url } from "../../api";

const SignupPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        referredBy: "",
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        packageCode: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const r = searchParams.get("r");
        if (r) {
            setFormData((prevData) => ({ ...prevData, referredBy: r }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "username" ? value.toLowerCase() : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.username || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${url}users/register-user`, formData);
            console.log("Signup successful:", response.data);

            // Redirect user to login page after successful signup
            navigate("/signin");
        } catch (err) {
            console.error("Signup failed:", err);
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#F5F6FA] md:flex-row">
            <div className="hidden h-full w-[60%] items-center justify-center md:flex">
                <div className="w-[60%] shadow-md">
                    <img
                        src={network}
                        alt="Network"
                        style={{ width: "100%", height: "300px" }}
                    />
                </div>
            </div>
            <div className="h-full w-full bg-[#FFFFFF] md:w-[40%]">
                <div className="flex items-center justify-center">
                    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-8">
                        <img
                            src={foodie}
                            alt="Logo"
                            style={{ width: "100px" }}
                        />
                        <h2 className="mb-4 text-center text-2xl font-semibold">Join Us Now!</h2>
                        <h2 className="mb-4 text-center text-sm font-semibold text-[#22C55E]">Start by creating your FWG account</h2>
                        {error && <p className="mb-2 text-center text-sm text-red-500">{error}</p>}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full"
                        >
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="referredBy"
                                    value={formData.referredBy}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter referrer ID (optional)"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="mb-4">
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
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="packageCode"
                                    value={formData.packageCode}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Enter your package code"
                                />
                                <p className="mt-2 text-sm text-gray-600">
                                    You do not have a code?{" "}
                                    <Link
                                        className="text-sm text-[#22C55E]"
                                        to={`/contact-vendor`}
                                    >
                                        Get Code
                                    </Link>
                                </p>
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
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border bg-[#E8F0FE] p-2"
                                    placeholder="Confirm your password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded bg-[#22C55E] py-2 text-white hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </form>
                        <p className="mt-4 text-center text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/signin"
                                className="text-[#22C55E]"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
