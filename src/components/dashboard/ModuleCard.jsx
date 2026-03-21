import { FolderOpen, ArrowRight, CheckCircle2, Layers, Award } from "lucide-react";

export default function ModuleCard({ module, isComplete, progressPercent, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
                relative p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1
                bg-zinc-900/40 hover:bg-zinc-800/80 border-white/5 hover:border-white/10
            `}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <FolderOpen size={24} />
                </div>
                {isComplete && <CheckCircle2 className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" size={24} />}
            </div>

            <h3 className="font-bold text-lg mb-2 text-white leading-tight">{module.title}</h3>
            <p className="text-zinc-500 text-sm mb-4 line-clamp-2 leading-relaxed">{module.description}</p>

            {/* Topics Covered */}
            {module.topics && module.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {module.topics.map((topic, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            )}

            {/* Deliverable/Output */}
            {module.output && (
                <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                        <Award size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mb-1">Deliverable</p>
                        <p className="text-xs text-white font-bold truncate">{module.output}</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-zinc-400">Progress</span>
                    <span className={progressPercent === 100 ? "text-emerald-400" : "text-indigo-400"}>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden inset-shadow-sm border border-white/5">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${progressPercent === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <button className="mt-6 w-full py-3 bg-white/5 hover:bg-indigo-500 hover:text-white text-zinc-300 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 text-sm">
                {progressPercent === 100 ? "Review Module" : progressPercent > 0 ? "Continue Module" : "Start Module"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
