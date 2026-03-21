import { useState, useEffect, useMemo } from "react";
import { Flame, Trophy, Target, Star, Layers, ArrowLeft, PlayCircle, Map } from "lucide-react";
import LevelCard from "./LevelCard";
import ModuleCard from "./ModuleCard";
import TaskItem from "./TaskItem";
import TaskDetail from "./TaskDetail";
import roadmapData from "../../data/roadmapData.json";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function DashboardOverview() {
    const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("userProfile") || "{}"));
    const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem("userProgress") || "{}"));
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem("userXp") || "0"));
    const [streak] = useState(12);
    const [loading, setLoading] = useState(true);

    // Drill-down UI State
    const [activeLevelId, setActiveLevelId] = useState(profile.currentLevelId || "level_1");
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    // Initial sync from Firebase
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setProfile(data);
                        setProgress(data.progress || {});
                        if (data.currentLevelId) setActiveLevelId(data.currentLevelId);
                        localStorage.setItem("userProfile", JSON.stringify(data));
                        localStorage.setItem("userProgress", JSON.stringify(data.progress || {}));
                    }
                } catch (error) {
                    console.error("Error fetching user data", error);
                }
            }
            setLoading(false);
        };
        fetchUserData();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) fetchUserData();
            else setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const activeLevelObj = useMemo(() => roadmapData.levels.find(l => l.id === activeLevelId) || roadmapData.levels[0], [activeLevelId]);
    const activeModuleObj = useMemo(() => activeLevelObj.modules?.find(m => m.id === activeModuleId) || null, [activeLevelObj, activeModuleId]);

    // Overall completion array for the entire timeline
    const allCompletedTasks = Object.values(progress).flatMap(p => p.completedTasks || []);

    // Calculate progress for an entire Level
    const calculateLevelProgress = (levelId) => {
        const lvl = roadmapData.levels.find(l => l.id === levelId);
        if (!lvl || !lvl.modules) return 0;
        const allTasks = lvl.modules.flatMap(m => m.tasks);
        if (allTasks.length === 0) return 0;
        const levelCompleted = allTasks.filter(t => allCompletedTasks.includes(t.id));
        return (levelCompleted.length / allTasks.length) * 100;
    };

    // Calculate progress for a specific Module
    const calculateModuleProgress = (module) => {
        if (!module.tasks || module.tasks.length === 0) return 0;
        const modCompleted = module.tasks.filter(t => allCompletedTasks.includes(t.id));
        return (modCompleted.length / module.tasks.length) * 100;
    };

    const toggleTask = async (taskId, taskXp) => {
        let currentLevelProgress = progress[activeLevelId] || { completedTasks: [], progressPercentage: 0 };
        let completed = [...(currentLevelProgress.completedTasks || [])];
        let newXp = xp;

        if (completed.includes(taskId)) {
            // Un-complete
            completed = completed.filter(t => t !== taskId);
            newXp -= taskXp;
        } else {
            // Complete
            completed.push(taskId);
            newXp += taskXp;
        }

        // Recalculate level percentage to store locally/FB
        const allLevelTasks = activeLevelObj.modules?.flatMap(m => m.tasks) || [];
        const levelPercent = allLevelTasks.length > 0 ? Math.round((completed.length / allLevelTasks.length) * 100) : 0;

        const newProgress = {
            ...progress,
            [activeLevelId]: { completedTasks: completed, progressPercentage: levelPercent }
        };

        setProgress(newProgress);
        setXp(newXp);
        localStorage.setItem("userProgress", JSON.stringify(newProgress));
        localStorage.setItem("userXp", newXp.toString());

        // Sync to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                // Don't await to keep UI fast
                setDoc(doc(db, "users", user.uid), { progress: newProgress }, { merge: true }).catch(err => console.error(err));
            } catch (error) {
                console.error("Error updating progress", error);
            }
        }
    };

    // Derived "Next Task" logic (Phase 5)
    // Find the first incomplete task in the active module (if inside a module). 
    // If not inside a module, find the first incomplete task in the whole level.
    const nextTask = useMemo(() => {
        const pool = activeModuleObj ? activeModuleObj.tasks : (activeLevelObj.modules?.flatMap(m => m.tasks) || []);
        return pool.find(t => !allCompletedTasks.includes(t.id)) || null;
    }, [activeModuleObj, activeLevelObj, allCompletedTasks]);


    if (loading) return <div className="p-8 text-white flex justify-center items-center gap-3 h-screen"><Flame className="animate-bounce text-orange-500" /> Syncing your progress...</div>;

    const totalLevelsCompleted = roadmapData.levels.filter(l => calculateLevelProgress(l.id) === 100).length;

    return (
        <div className="flex flex-col gap-8 pb-32">

            {/* Task Detail Modal */}
            <TaskDetail
                task={activeTask}
                isCompleted={activeTask ? allCompletedTasks.includes(activeTask.id) : false}
                onComplete={() => toggleTask(activeTask.id, activeTask.xp)}
                onClose={() => setActiveTask(null)}
            />

            {/* Hero Panel */}
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 to-purple-950/50">
                <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-[35rem] h-[35rem] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-indigo-200 uppercase tracking-widest backdrop-blur-xl">
                                {profile.skillLevel || "Beginner"} • {profile.goal || "Learning"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                            Welcome back 👋
                        </h1>
                        <p className="text-indigo-200 text-lg max-w-xl font-medium tracking-tight opacity-90 leading-relaxed mb-6">
                            Keep completing learning modules to unlock new opportunities. Consistency is the key to mastery.
                        </p>

                        {/* Next Task Recommendation */}
                        {nextTask && (
                            <div className="bg-indigo-900/40 border border-indigo-400/30 p-5 rounded-2xl flex items-center justify-between gap-4 max-w-2xl shadow-inner backdrop-blur-md">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                                        <PlayCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-1">👉 Up Next for you</p>
                                        <p className="font-bold text-white leading-tight">{nextTask.title}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        // Auto-navigate to module if not selected
                                        const owningModule = activeLevelObj.modules.find(m => m.tasks.some(t => t.id === nextTask.id));
                                        if (owningModule) setActiveModuleId(owningModule.id);
                                        setActiveTask(nextTask);
                                    }}
                                    className="px-5 py-2.5 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg active:scale-95 whitespace-nowrap"
                                >
                                    Start Now
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Top Stat Cards */}
                    <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto">
                        <div className="flex-1 lg:flex-none w-full sm:w-auto bg-emerald-500/10 border border-emerald-500/20 px-6 py-5 rounded-3xl flex flex-col justify-center shadow-inner backdrop-blur-xl group">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="text-emerald-400 group-hover:scale-110 transition-transform" size={20} />
                                <p className="text-[11px] text-emerald-300 uppercase font-black tracking-widest">Mastered</p>
                            </div>
                            <p className="text-4xl font-black text-white">{totalLevelsCompleted} <span className="text-lg text-emerald-500/50">/ {roadmapData.levels.length}</span></p>
                        </div>
                        <div className="flex-1 lg:flex-none w-full sm:w-auto bg-orange-500/10 border border-orange-500/20 px-6 py-5 rounded-3xl flex flex-col justify-center shadow-inner backdrop-blur-xl group">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="text-orange-500 group-hover:scale-110 transition-transform" size={20} />
                                <p className="text-[11px] text-orange-300 uppercase font-black tracking-widest">Day Streak</p>
                            </div>
                            <p className="text-4xl font-black text-white">{streak}</p>
                        </div>
                        <div className="flex-1 lg:flex-none w-full sm:w-auto bg-yellow-500/10 border border-yellow-500/20 px-6 py-5 rounded-3xl flex flex-col justify-center shadow-inner backdrop-blur-xl group">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="text-yellow-400 group-hover:scale-110 transition-transform" size={20} fill="currentColor" />
                                <p className="text-[11px] text-yellow-300 uppercase font-black tracking-widest">Total XP</p>
                            </div>
                            <p className="text-4xl font-black text-white">{xp}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level Selection Grid - Only show when NOT inside a module */}
            {!activeModuleId && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-white tracking-tight">
                            <Map className="text-indigo-400" size={28} /> Year-wise Journey
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {roadmapData.levels.map((level, index) => {
                            const prog = calculateLevelProgress(level.id);
                            const isUnlocked = index === 0 || calculateLevelProgress(roadmapData.levels[index - 1].id) === 100 || profile.currentLevelId === level.id;

                            return (
                                <LevelCard
                                    key={level.id}
                                    level={level}
                                    isActive={activeLevelId === level.id}
                                    isUnlocked={isUnlocked}
                                    progress={prog}
                                    onClick={() => {
                                        setActiveLevelId(level.id);
                                        setActiveModuleId(null);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Active Level / Module Content Area */}
            <div className="glass-panel rounded-[2.5rem] border border-white/5 relative overflow-hidden bg-zinc-950/50 shadow-2xl">

                {/* Dynamic Header */}
                <div className="p-8 md:p-10 border-b border-white/5 bg-zinc-900/30">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            {activeModuleId ? (
                                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                                    <button
                                        onClick={() => setActiveModuleId(null)}
                                        className="mb-4 flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-full border border-white/5"
                                    >
                                        <ArrowLeft size={16} /> Back to Modules
                                    </button>
                                    <h2 className="text-3xl font-black flex items-center gap-3 text-white tracking-tight">
                                        <Layers className="text-purple-400" size={32} /> {activeModuleObj.title}
                                    </h2>
                                    <p className="text-zinc-400 text-sm mt-2 font-medium">{activeModuleObj.description}</p>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-black flex items-center gap-3 text-white tracking-tight">
                                            <Target className="text-purple-400" size={32} /> {activeLevelObj.title} Modules
                                        </h2>
                                    </div>
                                    <p className="text-zinc-400 text-sm font-medium">{activeLevelObj.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-4 bg-zinc-950 px-6 py-4 rounded-2xl border border-white/5 shadow-inner min-w-[200px]">
                            <span className="font-black text-indigo-400 text-xl tracking-tighter">
                                {Math.round(activeModuleId ? calculateModuleProgress(activeModuleObj) : calculateLevelProgress(activeLevelId))}%
                            </span>
                            <div className="flex-1 h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 relative"
                                    style={{ width: `${activeModuleId ? calculateModuleProgress(activeModuleObj) : calculateLevelProgress(activeLevelId)}%` }}
                                >
                                    <div className="absolute top-0 right-0 w-8 h-full bg-white/30 blur-[2px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-8 md:p-10 min-h-[400px]">
                    {!activeModuleId ? (
                        /* Module Selection Grid Matrix */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                            {activeLevelObj.modules?.map((module) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    isComplete={calculateModuleProgress(module) === 100}
                                    progressPercent={calculateModuleProgress(module)}
                                    onClick={() => setActiveModuleId(module.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        /* Task Item List Matrix */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            {activeModuleObj.tasks?.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    isCompleted={allCompletedTasks.includes(task.id)}
                                    onToggle={() => setActiveTask(task)} /* Phase 7 interaction! */
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
