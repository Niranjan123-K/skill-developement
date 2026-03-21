import { Briefcase, Github, ExternalLink, Code2 } from "lucide-react";

export default function ProjectsHub() {
    const projects = [
        { id: 1, title: 'Personal Portfolio', tech: ['React', 'Tailwind'], difficulty: 'Beginner', status: 'Completed', color: 'from-blue-500 to-indigo-500' },
        { id: 2, title: 'Algorithm Visualizer', tech: ['JavaScript', 'Canvas'], difficulty: 'Intermediate', status: 'In Progress', color: 'from-purple-500 to-pink-500' },
        { id: 3, title: 'Fullstack E-Commerce', tech: ['Next.js', 'PostgreSQL'], difficulty: 'Advanced', status: 'Locked', color: 'from-orange-500 to-red-500' },
        { id: 4, title: 'Chat Application', tech: ['Socket.io', 'Node.js'], difficulty: 'Advanced', status: 'Locked', color: 'from-emerald-500 to-teal-500' }
    ];

    return (
        <div className="pb-32">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <Briefcase className="text-pink-400" size={36} /> Projects Hub
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Build world-class portfolio items perfectly aligned with recruiters.</p>
                </div>
                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                    <Github size={18} fill="currentColor" /> Sync GitHub
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((proj, idx) => (
                    <motion.div
                        key={proj.id}
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-8 rounded-[2rem] border border-white/5 bg-zinc-950/60 hover:bg-zinc-900/60 transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-12">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${proj.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <Code2 className="text-white" size={28} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-500 bg-zinc-900 border border-white/5 px-4 py-1.5 rounded-full">
                                {proj.status}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black text-white tracking-tight mb-4">{proj.title}</h3>

                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${proj.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' : proj.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                                {proj.difficulty}
                            </span>
                            {proj.tech.map(t => (
                                <span key={t} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${proj.status === 'Locked' ? 'bg-zinc-900 text-zinc-500 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}>
                                <Code2 size={16} /> Source Code
                            </button>
                            <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${proj.status === 'Locked' ? 'bg-zinc-900 text-zinc-600' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'}`}>
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
