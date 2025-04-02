import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import SigninPage from "./routes/signin/page";
import SignupPage from "./routes/signup/page";

import ProtectedRoute from "./components/ProtectedRoute";
import TransactionPage from "./routes/transactions/page";
import AffiliateUpgradePage from "./routes/affiliateUpgrade/page";
import AffiliatePage from "./routes/affiliate/page";
import ContactVendorPage from "./routes/contactVendor/page";
import ProfilePage from "./routes/profile/page";
import SupportPage from "./routes/support/page";
import PaymentPage from "./routes/payment/page";
import UpdateProfilePage from "./routes/updateProfile/page";

function App() {
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                { index: true, element: <DashboardPage /> },
                { path: "transactions", element: <TransactionPage /> },
                { path: "affiliates", element: <AffiliatePage /> },
                { path: "affiliates-upgrade", element: <AffiliateUpgradePage /> },
                { path: "support", element: <SupportPage /> },
                { path: "payments", element: <PaymentPage /> },
            ],
        },
        { path: "/signin", element: <SigninPage /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/contact-vendor", element: <ContactVendorPage /> },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/update-profile",
            element: (
                <ProtectedRoute>
                    <UpdateProfilePage />
                </ProtectedRoute>
            ),
        },
        {
            path: "*",
            element: (
                <Navigate
                    to="/signin"
                    replace
                />
            ),
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
