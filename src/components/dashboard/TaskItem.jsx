import { Check, Play, Star, BookOpen, Code } from "lucide-react";

export default function TaskItem({ task, isCompleted, onToggle }) {
    return (
        <div
            className={`
                flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                ${isCompleted ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-zinc-900/60 border-white/5 hover:bg-zinc-800 hover:border-white/10'}
            `}
            onClick={onToggle}
        >
            <button className={`
                w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                ${isCompleted ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}
            `}>
                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Play size={18} className="translate-x-0.5" />}
            </button>

            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">{task.phase}</span>
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> {task.xp} XP
                    </span>
                </div>
                <h4 className={`text-sm font-bold ${isCompleted ? 'text-zinc-400 line-through decoration-zinc-500/50' : 'text-zinc-100'}`}>
                    {task.title}
                </h4>
            </div>

            <div className={`shrink-0 ${isCompleted ? 'text-emerald-500/50' : 'text-zinc-600'}`}>
                {task.type === 'Project' ? <Code size={20} /> : <BookOpen size={20} />}
            </div>
        </div>
    );
}
