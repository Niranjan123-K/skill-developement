import { CheckCircle2, X, BookOpen, Code, Trophy, Target } from "lucide-react";

export default function TaskDetail({ task, isCompleted, onComplete, onClose }) {
    if (!task) return null;

    const isProject = task.type === "Project";
    const isPractice = task.type === "Practice";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white border border-[var(--border-color)] rounded-[2rem] w-full max-w-3xl shadow-xl relative z-10 pointer-events-auto overflow-hidden flex flex-col max-h-full">

                {/* Header */}
                <div className={`h-32 md:h-40 w-full relative flex items-end p-8 ${isProject ? 'bg-purple-50' : isPractice ? 'bg-blue-50' : 'bg-emerald-50'} border-b border-[var(--border-color)]`}>
                    <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors border border-[var(--border-color)] shadow-sm">
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border ${isProject ? 'bg-purple-100 border-purple-200' : isPractice ? 'bg-blue-100 border-blue-200' : 'bg-emerald-100 border-emerald-200'}`}>
                            {isProject ? <Trophy size={32} className="text-purple-600" /> : isPractice ? <Code size={32} className="text-blue-600" /> : <BookOpen size={32} className="text-emerald-600" />}
                        </div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">{task.type} • {task.xp} XP</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">{task.title}</h2>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 bg-white">
                    <div className="space-y-10">

                        {/* Concept / Problem Statement */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                                <Target size={14} /> {isProject ? "Problem Statement" : "Concept"}
                            </h3>
                            <div className="p-6 rounded-xl bg-gray-50 border border-[var(--border-color)] text-gray-700 leading-relaxed text-sm md:text-base">
                                {task.content?.explanation || "Content coming soon."}
                            </div>
                        </section>

                        {/* Instructions / Requirements */}
                        {task.content?.instructions && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> {isProject ? "Requirements" : "Your Mission"}
                                </h3>
                                <div className="p-6 rounded-xl bg-orange-50/50 border border-orange-100 text-gray-700 leading-relaxed text-sm md:text-base border-l-4 border-l-orange-500">
                                    {task.content.instructions}
                                </div>
                            </section>
                        )}

                        {/* Example / Expected Output */}
                        {task.content?.example && (
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4 flex items-center gap-2">
                                    <Code size={14} /> {isProject ? "Expected Output" : "Example"}
                                </h3>
                                <pre className="p-6 rounded-xl bg-gray-900 border border-gray-800 text-emerald-400 text-sm overflow-x-auto leading-relaxed shadow-inner">
                                    {task.content.example}
                                </pre>
                            </section>
                        )}

                        {/* Notes */}
                        {isPractice && (
                            <p className="text-xs text-gray-500 font-medium italic text-center">
                                Tip: Write your code locally in VS Code or try it out in your browser's console to practice!
                            </p>
                        )}
                        {isProject && (
                            <p className="text-xs text-gray-500 font-medium italic text-center">
                                Tip: Build this in your own local environment. Don't worry about making it perfect on the first try!
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 md:p-8 border-t border-[var(--border-color)] bg-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                        {isCompleted ? "You've successfully completed this mission." : "Ready to claim your XP?"}
                    </p>
                    <button
                        onClick={() => {
                            if (!isCompleted) onComplete();
                            setTimeout(() => onClose(), 800);
                        }}
                        disabled={isCompleted}
                        className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                            ${isCompleted
                                ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 cursor-default'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'
                            }
                        `}
                    >
                        {isCompleted ? (
                            <><CheckCircle2 size={20} /> Mission Accomplished</>
                        ) : (
                            <><Trophy size={20} /> Mark as Completed</>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
