import { Map, MapPin, Flag, Trophy, Target, Hexagon, Star } from "lucide-react";

const years = [
    { id: 1, title: "Year 1: Foundations", xp: "1,200", status: "Active", color: "from-blue-600 to-indigo-600", border: "border-blue-500/30", icon: <MapPin /> },
    { id: 2, title: "Year 2: Core Engineering", xp: "3,500", status: "Locked", color: "from-purple-600 to-pink-600", border: "border-purple-500/30", icon: <Target /> },
    { id: 3, title: "Year 3: Adv. Architecture", xp: "8,000", status: "Locked", color: "from-emerald-600 to-teal-600", border: "border-emerald-500/30", icon: <Hexagon /> },
    { id: 4, title: "Year 4: Career Launch", xp: "15,000", status: "Locked", color: "from-orange-600 to-red-600", border: "border-orange-500/30", icon: <Flag /> },
];

export default function Roadmap() {
    return (
        <div className="pb-32 relative">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <Map className="text-indigo-400" size={36} /> Global Roadmap
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Your absolute trajectory from zero to top-tier engineer.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {years.map((year, idx) => (
                    <motion.div
                        key={year.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 300, damping: 25 }}
                        className={`glass-panel p-8 rounded-[2.5rem] border ${year.border} relative overflow-hidden group hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all bg-zinc-950/40`}
                    >
                        {/* Background glow specific to year */}
                        <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${year.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`}></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${year.color} shadow-lg text-white`}>
                                    {year.icon}
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${year.status === 'Active' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-zinc-800 text-zinc-500 border border-white/5'}`}>
                                    {year.status}
                                </span>
                            </div>

                            <h3 className="text-3xl font-black text-white tracking-tight mb-2">{year.title}</h3>
                            <div className="flex items-center gap-2 text-yellow-400 font-bold mb-8">
                                <Star size={16} fill="currentColor" /> {year.xp} Total XP Required
                            </div>

                            <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                                <div className={`h-full bg-gradient-to-r ${year.color} rounded-full opacity-50 w-0`}></div>
                            </div>

                            <button className="w-full mt-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold transition-colors">
                                {year.status === 'Active' ? 'Enter Map' : 'Map Locked'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
