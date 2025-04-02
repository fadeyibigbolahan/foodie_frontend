import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import foodie from "@/assets/foodie.png";

const PaymentPage = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="card flex w-full gap-4 rounded-md bg-white p-4">
                <div>
                    <img
                        src={foodie}
                        alt="Logoipsum"
                        style={{ width: "100px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
