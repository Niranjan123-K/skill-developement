import { TrendingUp, BarChart } from "lucide-react";

export default function Progress() {
    const weeklyData = [65, 40, 85, 70, 95, 60, 80];

    return (
        <div className="pb-32">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                    <TrendingUp className="text-emerald-400" size={36} /> Analytics Hub
                </h1>
                <p className="text-zinc-400 mt-2 font-medium">Deep dive into your performance metrics and time allocation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Chart */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-zinc-950/50">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-bold text-white tracking-tight">Weekly Focus</h3>
                        <span className="text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold">+12% vs last week</span>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {weeklyData.map((val, i) => (
                            <div key={i} className="w-full bg-zinc-900 rounded-t-xl relative group flex justify-center h-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-transparent group-hover:text-emerald-400 transition-colors">{val}%</div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-bold text-zinc-500 px-4 uppercase tracking-widest">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </motion.div>

                {/* Aggregate Stats */}
                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} delay={0.2} className="glass-panel p-8 rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                            <BarChart size={24} />
                        </div>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Hours Coded</p>
                        <h4 className="text-5xl font-black text-white mt-2">124<span className="text-2xl text-emerald-500">h</span></h4>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} delay={0.3} className="glass-panel p-8 rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-transparent">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Global Rank</p>
                        <h4 className="text-5xl font-black text-white mt-2">Top 4%</h4>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
