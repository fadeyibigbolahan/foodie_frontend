import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import foodie from "@/assets/foodie.png";

const SupportPage = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="card flex w-full gap-4 rounded-md bg-white p-4">
                <div>
                    <img
                        src={foodie}
                        alt="Logoipsum"
                        style={{ width: "100px" }}
                    />
                    <p className="text-sm text-gray-500">Customer Support</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p>CONTACT INFO</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row items-center justify-start gap-2">
                            <Mail
                                className="text-gray-500"
                                size={15}
                            />
                            <p className="text-sm text-gray-500">foodieworldglobal@gmail.com</p>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2">
                            <Phone
                                className="text-gray-500"
                                size={15}
                            />
                            <p className="text-sm text-gray-500">+234 803 213 9983</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
