import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Map,
    TrendingUp,
    Briefcase,
    Target,
    Award,
    GraduationCap,
    FileText
} from "lucide-react";

export default function Sidebar() {
    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Roadmap", path: "/dashboard/roadmap", icon: <Map size={20} /> },
        { name: "Progress", path: "/dashboard/progress", icon: <TrendingUp size={20} /> },
        { name: "Projects Hub", path: "/dashboard/projects", icon: <Briefcase size={20} /> },
        { name: "Action Plan", path: "/dashboard/actions", icon: <Target size={20} /> },
        { name: "Skill Tracker", path: "/dashboard/skills", icon: <Award size={20} /> },
        { name: "Internships", path: "/dashboard/internships", icon: <GraduationCap size={20} /> },
        { name: "Resume Builder", path: "/dashboard/resume", icon: <FileText size={20} /> },
    ];

    return (
        <aside className="w-64 h-[calc(100%-2rem)] glass-panel flex flex-col my-4 ml-4 rounded-2xl overflow-hidden shadow-xl relative z-20">
            <div className="p-6 border-b border-[var(--border-color)]">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                    <GraduationCap size={28} className="text-blue-500" />
                    Elevate
                </h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === "/dashboard"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                ? "bg-blue-500/10 text-blue-500 font-semibold"
                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-color)]"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                                )}
                                <div className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                                    {item.icon}
                                </div>
                                <span>{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                        S
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Student User</p>
                        <p className="text-xs text-[var(--text-secondary)]">2nd Year • Web Dev</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
