import { CheckCircle2, Lock, Flame } from "lucide-react";

export default function LevelCard({ level, isActive, isUnlocked, progress, onClick }) {
    return (
        <div
            onClick={isUnlocked ? onClick : null}
            className={`
                relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden group
                ${isActive ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : isUnlocked ? 'bg-zinc-900/50 border-white/10 hover:border-white/20' : 'bg-zinc-950/50 border-white/5 opacity-60 cursor-not-allowed'}
            `}
        >
            {/* Background Glow for active state */}
            {isActive && <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>}

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-indigo-500/20 text-indigo-400' : isUnlocked ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-900 text-zinc-600'}`}>
                    {isUnlocked ? <Flame size={24} className={isActive ? 'animate-pulse' : ''} /> : <Lock size={24} />}
                </div>
                {progress === 100 && <CheckCircle2 className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" size={24} />}
            </div>

            <div className="relative z-10">
                <h3 className={`font-bold text-lg mb-1 leading-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>{level.title}</h3>
                <p className="text-zinc-500 text-xs mb-6 line-clamp-2">{level.description}</p>

                {isUnlocked && (
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-black text-zinc-400">{Math.round(progress)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
}
