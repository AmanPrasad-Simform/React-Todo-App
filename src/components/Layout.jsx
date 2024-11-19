import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SuspenseErrorBoundary from "./ErrorBoundary";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <SuspenseErrorBoundary>
                    <Outlet />
                </SuspenseErrorBoundary>
            </div>
        </div>
    );
};

export default Layout;
