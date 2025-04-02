import React, { useEffect, useState } from "react";
import { LogOut, UserRoundPen, KeyRound, CircleFadingArrowUp, CircleUserRound, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import profileImg from "@/assets/user.png";
import { url } from "../../api";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            console.log("Token:", localStorage.getItem("token"));

            try {
                const response = await fetch(`${url}users/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("token")}`, // Ensure Bearer token format
                    },
                });

                console.log("Profile Response:", response);
                console.log("Response Status:", response.status);

                if (!response.ok) {
                    const errorText = await response.text(); // Log non-JSON responses (e.g., 401 errors)
                    console.error("Error Response:", errorText);
                    throw new Error(`Failed to fetch profile: ${errorText}`);
                }

                const data = await response.json();
                console.log("Profile Data:", data); // Log response data
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F5F6FA]">
            <div className="relative flex h-full w-full flex-col items-center justify-start bg-white md:w-1/2">
                <div className="absolute top-0 flex h-4 w-full items-center justify-between gap-4 bg-[#22C55E] p-6">
                    <Link to="/">
                        <ArrowLeft
                            size={20}
                            color="white"
                        />
                    </Link>
                    <p className="text-xl font-bold text-white">Profile</p>
                    <div />
                </div>
                <div className="mt-16 flex flex-col items-center justify-center md:gap-4">
                    <div className="full flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#F5F6FA]">
                        <img
                            src={profileImg}
                            alt="profile image"
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
                        <p className="text-xl font-bold">{profile?.name}</p>
                        <p className="mt-4 flex flex-col items-center justify-center gap-2 text-sm">
                            <span className="rounded-md bg-black p-1 font-bold text-white">Email:</span>{" "}
                            <span className="font-bold">{profile?.email}</span>
                        </p>
                        <p className="flex flex-col items-center justify-center gap-2 text-sm">
                            <span className="rounded-md bg-black p-1 font-bold text-white">Phone number:</span>{" "}
                            <span className="font-bold">{profile?.phoneNumber}</span>
                        </p>
                    </div>
                </div>
                <div className="mt-5 flex w-full flex-col items-center justify-center gap-4 border-b-2 border-t-2 p-4 md:flex-row md:justify-evenly">
                    <div
                        onClick={logout}
                        className="flex h-[100px] w-1/2 flex-col items-center justify-center gap-2 rounded-md bg-[#22C55E50] hover:bg-black hover:text-white md:h-[100px] md:w-[150px]"
                    >
                        <LogOut size={30} />
                        <p className="text-center text-xs font-bold">LOGOUT</p>
                    </div>
                    <Link
                        to="/update-profile"
                        className="flex h-[100px] w-1/2 flex-col items-center justify-center gap-2 rounded-md bg-[#22C55E50] hover:bg-black hover:text-white md:h-[100px] md:w-[150px]"
                    >
                        <UserRoundPen size={30} />
                        <p className="text-center text-xs font-bold">UPDATE ACCOUNT</p>
                    </Link>
                    <Link
                        to="/update-profile"
                        className="flex h-[100px] w-1/2 flex-col items-center justify-center gap-2 rounded-md bg-[#22C55E50] hover:bg-black hover:text-white md:h-[100px] md:w-[150px]"
                    >
                        <KeyRound size={30} />
                        <p className="text-center text-xs font-bold">UPDATE PASSWORD</p>
                    </Link>
                    <Link
                        to="/affiliates-upgrade"
                        className="flex h-[100px] w-1/2 flex-col items-center justify-center gap-2 rounded-md bg-[#22C55E50] hover:bg-black hover:text-white md:h-[100px] md:w-[150px]"
                    >
                        <CircleFadingArrowUp size={30} />
                        <p className="text-center text-xs font-bold">AFFILIATE UPGRADE</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
