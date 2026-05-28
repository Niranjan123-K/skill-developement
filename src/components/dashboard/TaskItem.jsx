import { Check, Play, Star, BookOpen, Code, Clock, Activity } from "lucide-react";

export default function TaskItem({ task, isCompleted, onToggle }) {
    // Determine difficulty color
    const difficultyColor = {
        Easy: "text-emerald-600 bg-emerald-50 border-emerald-100",
        Medium: "text-orange-600 bg-orange-50 border-orange-100",
        Hard: "text-rose-600 bg-rose-50 border-rose-100",
    }[task.difficulty || "Medium"];

    return (
        <div
            className={`
                group relative flex flex-col p-5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${isCompleted 
                    ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
                    : 'bg-white border-[var(--border-color)] hover:border-blue-300 hover:shadow-md'}
            `}
            onClick={onToggle}
        >
            <div className="relative z-10 flex items-start justify-between gap-4 w-full">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[9px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100">
                            {task.phase}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 border ${difficultyColor}`}>
                            <Activity size={10} /> {task.difficulty || "Medium"}
                        </span>

                        <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1 border border-gray-200">
                            <Clock size={10} /> {task.estimatedTime || "30 min"}
                        </span>
                    </div>

                    <h4 className={`text-base font-bold mb-1 leading-tight transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-[var(--text-primary)] group-hover:text-blue-600'}`}>
                        {task.title}
                    </h4>
                </div>

                {/* Right side icon/status */}
                <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 shadow-sm ${isCompleted ? 'bg-emerald-500 text-white scale-110' : 'bg-gray-100 text-gray-400 border border-[var(--border-color)] group-hover:bg-blue-500 group-hover:text-white group-hover:scale-105'}`}>
                    {isCompleted ? <Check size={20} strokeWidth={3} className="animate-in zoom-in duration-300" /> : <Play size={16} className="translate-x-[1px]" />}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                        {task.type === 'Project' ? <Code size={14} /> : <BookOpen size={14} />}
                    </div>
                    <span className={`text-xs font-bold ${isCompleted ? 'text-emerald-600' : 'text-gray-500 group-hover:text-blue-500'}`}>{task.type}</span>
                </div>
                
                <span className={`text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${isCompleted ? 'text-yellow-600 bg-yellow-50 border border-yellow-200' : 'text-yellow-600 bg-yellow-50 border border-yellow-100'}`}>
                    <Star size={12} fill="currentColor" /> +{task.xp} XP
                </span>
            </div>
        </div>
    );
}
