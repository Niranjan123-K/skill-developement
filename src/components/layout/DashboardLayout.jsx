import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-color)]">
            <Sidebar />
            
            <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
