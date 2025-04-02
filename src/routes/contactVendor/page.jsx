import React, { useEffect, useState } from "react";
import { LogOut, UserRoundPen, KeyRound, CircleFadingArrowUp, CircleUserRound, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { vendors } from "../../constants";
import whatsapp from "../../assets/whatsapp.jpg";

const ContactVendorPage = () => {
    const { user, logout } = useAuth();
    useEffect(() => {
        console.log("userr", user);
    }, [user]);
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
                    <p className="text-xl font-bold text-white">Coupon Vendors</p>
                    <div />
                </div>
                <div className="mt-16 flex flex-col items-center justify-center py-5 md:gap-4">
                    <h1 className="text-center text-3xl font-bold">CONTACT ANY OF THE VENDORS HERE</h1>
                </div>
                <div className="mt-5 flex w-full flex-col flex-wrap items-center justify-center gap-4 border-b-2 border-t-2 p-4 md:flex-row md:justify-evenly">
                    {vendors.map((vendor) => (
                        <a
                            key={vendor._id}
                            href={vendor.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-2/3 items-center justify-between gap-4 rounded-md border-2 border-[#22C55E] bg-[#F5F6FA] p-4 md:w-[45%]"
                        >
                            <div className="flex gap-2">
                                <CircleUserRound
                                    size={40}
                                    color="#22C55E"
                                />
                                <p className="text-lg font-semibold">{vendor.name}</p>
                            </div>
                            <div className="h-[40px] w-[40px] overflow-hidden rounded-full bg-black">
                                <img
                                    src={whatsapp}
                                    alt="vendor"
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactVendorPage;
