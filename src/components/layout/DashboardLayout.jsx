import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Moon, Sun, Bell } from "lucide-react";

export default function DashboardLayout() {
    const [theme, setTheme] = useState("dark"); // Defaulting to dark mode for a premium feel

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-color)] transition-colors duration-300 relative">
            {/* Dynamic Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <Sidebar />
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-color)] glass-panel mt-4 mr-4 mb-4 rounded-xl shadow-sm relative z-20">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">Student Hub</h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-[var(--border-color)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-[var(--border-color)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto px-1 mr-4 mb-4 relative z-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
