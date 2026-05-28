import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
    LayoutDashboard,
    Map,
    TrendingUp,
    Briefcase,
    Target,
    Award,
    GraduationCap,
    FileText,
    ChevronDown,
    Search,
    PanelLeftClose,
    PanelLeftOpen,
    CheckSquare,
    Code,
    BrainCircuit,
    MessageSquare,
    BookOpen
} from "lucide-react";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const mainNavItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Semester Roadmap", path: "/dashboard/roadmap", icon: <Map size={18} /> },
        { name: "Daily Tasks", path: "/dashboard/tasks", icon: <CheckSquare size={18} /> },
        { name: "Progress", path: "/dashboard/progress", icon: <TrendingUp size={18} /> },
        { name: "Study Materials", path: "/dashboard/resources", icon: <BookOpen size={18} /> },
    ];

    const careerNavItems = [
        { name: "Projects Hub", path: "/dashboard/projects", icon: <Briefcase size={18} /> },
        { name: "Coding Practice", path: "/dashboard/coding", icon: <Code size={18} /> },
        { name: "Aptitude Prep", path: "/dashboard/aptitude", icon: <BrainCircuit size={18} /> },
        { name: "Communication", path: "/dashboard/communication", icon: <MessageSquare size={18} /> },
        { name: "Skill Tracker", path: "/dashboard/skills", icon: <Award size={18} /> },
        { name: "Action Plan", path: "/dashboard/actions", icon: <Target size={18} /> },
    ];

    const devNavItems = [
        { name: "Internships", path: "/dashboard/internships", icon: <GraduationCap size={18} /> },
        { name: "Resume Builder", path: "/dashboard/resume", icon: <FileText size={18} /> },
    ];

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-full bg-white flex flex-col border-r border-[var(--border-color)] transition-all duration-300 relative z-20`}>
            {/* Header */}
            <div className={`p-4 flex items-center justify-between border-b border-[var(--border-color)]`}>
                {!isCollapsed && (
                    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center text-white font-bold shadow-sm">
                            S
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-[var(--text-primary)] leading-tight flex items-center gap-1">
                                Student Hub <ChevronDown size={14} className="text-[var(--text-secondary)]" />
                            </span>
                            <span className="text-xs text-[var(--text-secondary)]">2nd Year • Web Dev</span>
                        </div>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 mx-auto rounded-lg bg-[#EA580C] flex items-center justify-center text-white font-bold shadow-sm">
                        S
                    </div>
                )}
                
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 text-[var(--text-secondary)] hover:bg-[var(--border-color)] rounded-md transition-colors absolute -right-3 top-5 bg-white border shadow-sm z-30"
                >
                    {isCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
                </button>
            </div>

            {/* Search */}
            <div className="p-4">
                <button className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-2 px-3 py-2'} bg-[#F8F9FA] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)] hover:border-gray-300 transition-colors`}>
                    <Search size={16} />
                    {!isCollapsed && (
                        <>
                            <span className="text-sm">Search...</span>
                            <span className="ml-auto text-xs border rounded px-1.5 py-0.5 bg-white shadow-sm font-medium">⌘K</span>
                        </>
                    )}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-6">
                
                {/* Main Section */}
                <div>
                    {!isCollapsed && <p className="px-3 mb-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Main</p>}
                    <div className="space-y-1">
                        {mainNavItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'} rounded-lg transition-all duration-200 group ${
                                        isActive
                                            ? "bg-[#E5E7EB] text-[var(--text-primary)] font-bold"
                                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50"
                                    }`
                                }
                            >
                                <div className="text-current">{item.icon}</div>
                                {!isCollapsed && <span className="text-sm">{item.name}</span>}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Career Section */}
                <div>
                    {!isCollapsed && <p className="px-3 mb-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Career Prep</p>}
                    <div className="space-y-1">
                        {careerNavItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'} rounded-lg transition-all duration-200 group ${
                                        isActive
                                            ? "bg-[#E5E7EB] text-[var(--text-primary)] font-bold"
                                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50"
                                    }`
                                }
                            >
                                <div className="text-current">{item.icon}</div>
                                {!isCollapsed && <span className="text-sm">{item.name}</span>}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Development Section */}
                <div>
                    {!isCollapsed && <p className="px-3 mb-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Launch</p>}
                    <div className="space-y-1">
                        {devNavItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'} rounded-lg transition-all duration-200 group ${
                                        isActive
                                            ? "bg-[#E5E7EB] text-[var(--text-primary)] font-bold"
                                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50"
                                    }`
                                }
                            >
                                <div className="text-current">{item.icon}</div>
                                {!isCollapsed && <span className="text-sm">{item.name}</span>}
                            </NavLink>
                        ))}
                    </div>
                </div>

            </nav>
        </aside>
    );
}
