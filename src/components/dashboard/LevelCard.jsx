import { CheckCircle2, Lock, Flame } from "lucide-react";

export default function LevelCard({ level, isActive, isUnlocked, progress, onClick }) {
    return (
        <div
            onClick={isUnlocked ? onClick : null}
            className={`
                relative p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group
                ${isActive ? 'bg-white border-blue-500 shadow-md' : isUnlocked ? 'bg-white border-[var(--border-color)] hover:border-gray-300 shadow-sm hover:shadow-md' : 'bg-gray-50 border-[var(--border-color)] opacity-60 cursor-not-allowed'}
            `}
        >
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-blue-50 text-blue-500' : isUnlocked ? 'bg-gray-100 text-gray-500' : 'bg-gray-200 text-gray-400'}`}>
                    {isUnlocked ? <Flame size={24} className={isActive ? 'animate-pulse' : ''} /> : <Lock size={24} />}
                </div>
                {progress === 100 && <CheckCircle2 className="text-emerald-500" size={24} />}
            </div>

            <div className="relative z-10">
                <h3 className={`font-bold text-lg mb-1 leading-tight ${isActive ? 'text-[var(--text-primary)]' : 'text-gray-800'}`}>{level.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2">{level.description}</p>

                {isUnlocked && (
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden border border-[var(--border-color)]">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{Math.round(progress)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
}
