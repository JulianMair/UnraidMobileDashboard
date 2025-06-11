import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Cog8ToothIcon, ServerIcon, Bars3Icon, ComputerDesktopIcon } from "@heroicons/react/16/solid";
import Docker from "../assets/Icons/icons8-docker.svg";
import DockerBlue from "../assets/Icons/icons8-docker-blue.svg";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: "/system", label: "System", icon: Cog8ToothIcon },
        { path: "/container", label: "Container", img: Docker, img_active: DockerBlue},
        { path: "/vm", label: "VMS", icon: ComputerDesktopIcon },
        { path: "/shares", label: "Shares", icon:ServerIcon },
    ];

    return (
        <nav className="bg-gray-500 p-4 fixed bottom-0 left-0 w-full text-white">
            <div className="flex justify-evenly items-center">
                {navItems.map(({ path, label, icon: Icon, img,img_active }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex flex-col items-center ${isActive ? "text-blue-400" : "text-gray-300"}`}
                        >
                            {img ? <img src={isActive ? img_active :img} className="w-6 h-6 mb-1" ></img>: null}
                            {Icon && <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-blue-500" : ""}`} />}
                            <span className="text-sm">{label}</span>
                            {isActive && <div className="w-6 h-1 bg-blue-500 rounded-full mt-1"></div>}
                        </Link>
                    );
                })}

                <button className="text-white sm:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Bars3Icon className="w-6 h-6 text-gray-800 cursor-pointer" />
                </button>
            </div>

            <ul className={`mt-4 space-y-2 sm:flex sm:space-x-4 sm:mt-0 sm:space-y-0 ${isOpen ? "block" : "hidden"}`}></ul>
        </nav>
    );
}

export default Navbar;
