import { CheckCircle2, Trophy, Clock, Star, Flame, Shield, Medal } from "lucide-react";

export default function DailyTasks() {
    const dailyTasks = [
        { id: 1, title: "Complete HTML Semantics Lesson", type: "Learning", xp: 50, completed: true },
        { id: 2, title: "Solve 3 CSS Flexbox Challenges", type: "Practice", xp: 100, completed: false },
        { id: 3, title: "Build a Personal Portfolio Hero Section", type: "Project", xp: 150, completed: false },
    ];

    const weeklyChallenges = [
        { id: 1, title: "7-Day Code Streak", progress: 5, total: 7, reward: "Fire Badge", icon: <Flame className="text-orange-500" /> },
        { id: 2, title: "Master Flexbox", progress: 100, total: 100, reward: "Flexbox Pro Badge", icon: <Shield className="text-blue-500" /> },
        { id: 3, title: "Complete Module 3", progress: 60, total: 100, reward: "Web Dev Novice", icon: <Star className="text-yellow-500" /> },
    ];

    const badges = [
        { name: "First Steps", desc: "Completed first lesson", icon: <Medal size={32} className="text-blue-500" /> },
        { name: "Flexbox Pro", desc: "Mastered CSS Flexbox", icon: <Shield size={32} className="text-blue-500" /> },
        { name: "On Fire", desc: "7 Day Streak", icon: <Flame size={32} className="text-orange-500 opacity-50 grayscale" /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-32">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3 text-[var(--text-primary)] tracking-tight">
                    <CheckCircle2 className="text-blue-500" size={28} /> Missions & Badges
                </h1>
                <p className="text-[var(--text-secondary)] mt-2 font-medium">Complete daily and weekly missions to earn XP and unlock badges.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Tasks */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <Clock className="text-blue-500" size={20} /> Today's Missions
                            </h3>
                            <span className="text-sm font-bold text-[var(--text-secondary)]">24h Remaining</span>
                        </div>
                        <div className="space-y-4">
                            {dailyTasks.map(task => (
                                <div key={task.id} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${task.completed ? 'bg-emerald-50 border-emerald-100' : 'bg-[#F8F9FA] border-[var(--border-color)] hover:border-gray-300'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${task.completed ? 'bg-emerald-500 text-white' : 'border-2 border-gray-300'}`}>
                                            {task.completed && <CheckCircle2 size={14} />}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm ${task.completed ? 'text-emerald-900 line-through' : 'text-[var(--text-primary)]'}`}>{task.title}</h4>
                                            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">{task.type}</span>
                                        </div>
                                    </div>
                                    <div className="font-bold text-sm text-yellow-600 flex items-center gap-1">
                                        +{task.xp} XP
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Challenges */}
                    <div className="bg-white p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                            <Trophy className="text-yellow-500" size={20} /> Weekly Challenges
                        </h3>
                        <div className="space-y-6">
                            {weeklyChallenges.map(challenge => (
                                <div key={challenge.id} className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {challenge.icon}
                                            <h4 className="font-bold text-[var(--text-primary)] text-sm">{challenge.title}</h4>
                                        </div>
                                        <span className="text-xs font-bold text-[var(--text-secondary)]">{challenge.progress} / {challenge.total}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)]">Reward: {challenge.reward}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Badges Area */}
                <div className="bg-white p-6 rounded-xl border border-[var(--border-color)] shadow-sm self-start">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                        <Star className="text-yellow-500" size={20} /> Your Badges
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {badges.map((badge, i) => (
                            <div key={i} className="flex flex-col items-center p-4 bg-[#F8F9FA] rounded-xl border border-[var(--border-color)] text-center">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                                    {badge.icon}
                                </div>
                                <h4 className="font-bold text-[var(--text-primary)] text-sm mb-1">{badge.name}</h4>
                                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}