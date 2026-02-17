import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Navbar({ community }) {
    return (
        <nav className="fixed top-0 w-full bg-gradient-to-b from-slate-800/70 to-transparent text-white backdrop-blur-sm z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <ApplicationLogo community={community} className="h-10 w-auto object-contain" />
                </Link>

                {/* Navigation Links */}
                <ul className="flex gap-8 items-center">
                    <li>
                        <a
                            href="#home"
                            className="hover:text-indigo-400 transition font-medium"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#member"
                            className="hover:text-indigo-400 transition font-medium"
                        >
                            Member
                        </a>
                    </li>
                    <li>
                        <a
                            href="#project"
                            className="hover:text-indigo-400 transition font-medium"
                        >
                            Project
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            className="hover:text-indigo-400 transition font-medium"
                        >
                            About Us
                        </a>
                    </li>
                </ul>

                {/* Contact Us Button */}
                <a
                    href="#contact"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition"
                >
                    Contact Us
                </a>
            </div>
        </nav>
    );
}
