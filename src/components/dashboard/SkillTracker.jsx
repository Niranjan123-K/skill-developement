import { Award, Lock, Zap, Hexagon } from "lucide-react";

export default function SkillTracker() {
    const skills = [
        { name: 'Frontend React', level: 4, max: 5, color: 'text-blue-400', bg: 'bg-blue-500/20' },
        { name: 'Backend Node.js', level: 2, max: 5, color: 'text-green-400', bg: 'bg-green-500/20' },
        { name: 'System Design', level: 1, max: 5, color: 'text-purple-400', bg: 'bg-purple-500/20' },
        { name: 'Algorithms', level: 3, max: 5, color: 'text-orange-400', bg: 'bg-orange-500/20' },
    ];

    return (
        <div className="pb-32">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                    <Award className="text-yellow-400" size={36} /> Skill Tree
                </h1>
                <p className="text-zinc-400 mt-2 font-medium">Allocate your earned XP to specialize your tech career path.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Core Skills List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-zinc-300 mb-6 uppercase tracking-widest">Active Proficiencies</h3>
                    {skills.map((skill, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 rounded-2xl border border-white/5 bg-zinc-950/40 hover:bg-zinc-900/40 transition-colors flex items-center gap-6"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${skill.bg} ${skill.color}`}>
                                <Hexagon size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-white">{skill.name}</h4>
                                    <span className="text-xs font-black text-zinc-500">Lv. {skill.level}</span>
                                </div>
                                <div className="flex gap-1.5">
                                    {Array.from({ length: skill.max }).map((_, slotIdx) => (
                                        <div key={slotIdx} className={`h-2 flex-1 rounded-full ${slotIdx < skill.level ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-zinc-800'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold text-white transition-colors">
                                Upgrade
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Locked Specializations */}
                <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/40">
                    <div className="flex items-center gap-3 mb-8">
                        <Zap className="text-yellow-400" />
                        <h3 className="text-2xl font-bold text-white tracking-tight">Specializations</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { title: 'Web3 / Blockchain', xpReq: 5000 },
                            { title: 'Cloud DevOps', xpReq: 7500 },
                            { title: 'AI Automation', xpReq: 10000 },
                        ].map((spec, i) => (
                            <div key={i} className="bg-zinc-950 p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center group cursor-not-allowed">
                                <Lock className="text-zinc-600 mb-4 group-hover:text-zinc-400 transition-colors" size={32} />
                                <h4 className="font-bold text-zinc-400 mb-2">{spec.title}</h4>
                                <span className="text-xs font-black text-yellow-500/50 bg-yellow-500/10 px-3 py-1 rounded-full">Requires {spec.xpReq} XP</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
