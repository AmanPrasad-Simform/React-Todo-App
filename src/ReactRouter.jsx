import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // checking authentication status (e.g., from localStorage or API)
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authStatus === "true");
    }, []);

    // PrivateRoute Component to protect routes that require authentication
    const PrivateRoute = ({ element }) => {
        const isAuthenticated =
            localStorage.getItem("isAuthenticated") === "true";
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={<PrivateRoute element={<Home />} />}
                    />
                    <Route
                        path="about"
                        element={<PrivateRoute element={<About />} />}
                    />

                    {/* Catch-all for invalid routes */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
