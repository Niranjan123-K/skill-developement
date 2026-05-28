import { FolderOpen, ArrowRight, CheckCircle2, Award } from "lucide-react";

export default function ModuleCard({ module, isComplete, progressPercent, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
                relative p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1 shadow-sm hover:shadow-md
                bg-white border-[var(--border-color)] hover:border-gray-300
            `}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <FolderOpen size={24} />
                </div>
                {isComplete && <CheckCircle2 className="text-emerald-500" size={24} />}
            </div>

            <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)] leading-tight">{module.title}</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2 leading-relaxed">{module.description}</p>

            {/* Topics Covered */}
            {module.topics && module.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {module.topics.map((topic, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            )}

            {/* Deliverable/Output */}
            {module.output && (
                <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-orange-50 border border-orange-100 transition-colors">
                    <div className="p-1.5 rounded-md bg-orange-100 text-orange-600">
                        <Award size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] text-orange-600/80 font-bold uppercase tracking-widest leading-none mb-1">Deliverable</p>
                        <p className="text-xs text-orange-800 font-bold truncate">{module.output}</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[var(--text-secondary)]">Progress</span>
                    <span className={progressPercent === 100 ? "text-emerald-500" : "text-blue-500"}>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <button className="mt-6 w-full py-3 bg-gray-50 hover:bg-blue-500 hover:text-white text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 text-sm border border-[var(--border-color)]">
                {progressPercent === 100 ? "Review Module" : progressPercent > 0 ? "Continue Module" : "Start Module"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
