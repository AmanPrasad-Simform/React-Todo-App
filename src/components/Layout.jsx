import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                {/* The nested routes will be rendered here */}
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
