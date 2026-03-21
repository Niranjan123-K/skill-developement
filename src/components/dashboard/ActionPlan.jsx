import { Target, GripVertical, CheckCircle2, CircleDashed } from "lucide-react";

export default function ActionPlan() {
    const columns = [
        { title: 'To Do', icon: <CircleDashed className="text-zinc-500" />, cards: ['Research React Router Data loaders', 'Watch System Design basics', 'Install Framer Motion'] },
        { title: 'In Progress', icon: <Target className="text-orange-400" />, cards: ['Refactor Onboarding component', 'Submit mock resume for grading'] },
        { title: 'Done', icon: <CheckCircle2 className="text-emerald-400" />, cards: ['Set up Vite + Tailwind', 'Configure dark mode CSS variables'] }
    ];

    return (
        <div className="pb-32 h-full">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                    <Target className="text-orange-400" size={36} /> Action Plan
                </h1>
                <p className="text-zinc-400 mt-2 font-medium">Your weekly micro-tasks Kanban board to stay insanely productive.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
                {columns.map((col, idx) => (
                    <div key={idx} className="glass-panel rounded-[2rem] border border-white/5 bg-zinc-950/40 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            {col.icon}
                            <h3 className="font-bold text-lg text-white tracking-tight">{col.title}</h3>
                            <span className="ml-auto bg-zinc-800 text-zinc-400 text-xs font-bold px-3 py-1 rounded-full">{col.cards.length}</span>
                        </div>

                        <div className="flex-1 space-y-4">
                            {col.cards.map((card, cIdx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: cIdx * 0.1 }}
                                    key={cIdx}
                                    className="bg-zinc-900 border border-white/10 p-5 rounded-2xl shadow-lg cursor-grab active:cursor-grabbing hover:bg-zinc-800 transition-colors flex items-start gap-4"
                                >
                                    <GripVertical className="text-zinc-600 mt-0.5" size={16} />
                                    <p className="text-sm font-medium text-zinc-200 leading-relaxed">{card}</p>
                                </motion.div>
                            ))}
                        </div>

                        <button className="mt-6 w-full py-4 border-2 border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white font-bold transition-all text-sm">
                            + Add Task
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
