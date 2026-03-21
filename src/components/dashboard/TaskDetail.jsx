import { CheckCircle2, X, BookOpen, Code, Trophy, Target } from "lucide-react";

export default function TaskDetail({ task, isCompleted, onComplete, onClose }) {
    if (!task) return null;

    const isProject = task.type === "Project";
    const isPractice = task.type === "Practice";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm pointer-events-auto transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-zinc-950 border border-white/10 rounded-[2.5rem] w-full max-w-3xl shadow-2xl relative z-10 pointer-events-auto overflow-hidden flex flex-col max-h-full">

                {/* Header Graphic */}
                <div className={`h-32 md:h-40 w-full relative flex items-end p-8 ${isProject ? 'bg-gradient-to-tr from-purple-900 via-indigo-900 to-indigo-950' : isPractice ? 'bg-gradient-to-tr from-blue-900 via-sky-900 to-slate-900' : 'bg-gradient-to-tr from-emerald-900 via-teal-900 to-zinc-900'}`}>
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
                    <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-md border border-white/10">
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                            {isProject ? <Trophy size={32} className="text-purple-300" /> : isPractice ? <Code size={32} className="text-blue-300" /> : <BookOpen size={32} className="text-emerald-300" />}
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1 block">{task.type} • {task.xp} XP</span>
                            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">{task.title}</h2>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 bg-zinc-900/40">
                    <div className="space-y-10">

                        {/* Concept / Problem Statement */}
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                                <Target size={14} /> {isProject ? "Problem Statement" : "Concept"}
                            </h3>
                            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-300 leading-relaxed text-sm md:text-base shadow-inner">
                                {task.content?.explanation || "Content coming soon."}
                            </div>
                        </section>

                        {/* Instructions / Requirements */}
                        {task.content?.instructions && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> {isProject ? "Requirements" : "Your Mission"}
                                </h3>
                                <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-zinc-300 leading-relaxed text-sm md:text-base border-l-4 border-l-orange-500">
                                    {task.content.instructions}
                                </div>
                            </section>
                        )}

                        {/* Example / Expected Output */}
                        {task.content?.example && (
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                                    <Code size={14} /> {isProject ? "Expected Output" : "Example"}
                                </h3>
                                <pre className="p-6 rounded-2xl bg-zinc-950 border border-white/5 text-emerald-300 text-sm overflow-x-auto shadow-inner leading-relaxed">
                                    {task.content.example}
                                </pre>
                            </section>
                        )}

                        {/* Practice Note */}
                        {isPractice && (
                            <p className="text-xs text-zinc-500 font-medium italic text-center">
                                Tip: Write your code locally in VS Code or try it out in your browser's console to practice!
                            </p>
                        )}
                        {isProject && (
                            <p className="text-xs text-zinc-500 font-medium italic text-center">
                                Tip: Build this in your own local environment. Don't worry about making it perfect on the first try!
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 md:p-8 border-t border-white/5 bg-zinc-950 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <p className="text-sm font-medium text-zinc-400">
                        {isCompleted ? "You've successfully completed this mission." : "Ready to claim your XP?"}
                    </p>
                    <button
                        onClick={() => {
                            if (!isCompleted) onComplete();
                            // Optional: Close modal automatically or show celebration
                            setTimeout(() => onClose(), 800);
                        }}
                        disabled={isCompleted}
                        className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                            ${isCompleted
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 active:scale-95'
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
