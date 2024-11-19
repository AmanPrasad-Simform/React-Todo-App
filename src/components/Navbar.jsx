import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@/components/MenuIcon"; // Import the icon
import Button from "@/components/Button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const linkClass =
        "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium";
    const mobileLinkClass = `${linkClass} block text-base`;

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 text-white text-xl">
                        Todo App
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            <Link to="/addTask" className={linkClass}>
                                Add Task
                            </Link>
                            <Link to="/tasks" className={linkClass}>
                                Tasks
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <Button
                            onClick={toggleMenu}
                            icon={MenuIcon}
                            aria-label="Toggle menu"
                            className="inline-flex items-center justify-center rounded-md text-white hover:text-gray-400 hover:bg-gray-400 focus:outline-none"
                            variant="default"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/addTask"
                            className={mobileLinkClass}
                            onClick={closeMenu}
                        >
                            Add Task
                        </Link>
                        <Link
                            to="/tasks"
                            className={mobileLinkClass}
                            onClick={closeMenu}
                        >
                            Tasks
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
