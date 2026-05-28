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
    const [activeSemester, setActiveSemester] = useState(1);

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
    const activeModuleObj = useMemo(() => activeLevelObj?.modules?.find(m => m.id === activeModuleId) || null, [activeLevelObj, activeModuleId]);

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
            completed = completed.filter(t => t !== taskId);
            newXp -= taskXp;
        } else {
            completed.push(taskId);
            newXp += taskXp;
        }

        const allLevelTasks = activeLevelObj?.modules?.flatMap(m => m.tasks) || [];
        const levelPercent = allLevelTasks.length > 0 ? Math.round((completed.length / allLevelTasks.length) * 100) : 0;

        const newProgress = {
            ...progress,
            [activeLevelId]: { completedTasks: completed, progressPercentage: levelPercent }
        };

        setProgress(newProgress);
        setXp(newXp);
        localStorage.setItem("userProgress", JSON.stringify(newProgress));
        localStorage.setItem("userXp", newXp.toString());

        const user = auth.currentUser;
        if (user) {
            try {
                setDoc(doc(db, "users", user.uid), { progress: newProgress }, { merge: true }).catch(err => console.error(err));
            } catch (error) {
                console.error("Error updating progress", error);
            }
        }
    };

    const dailyMissions = useMemo(() => {
        const allLevelTasks = activeLevelObj?.modules?.flatMap(m => m.tasks) || [];
        const incompleteTasks = allLevelTasks.filter(t => !allCompletedTasks.includes(t.id));
        
        return {
            learning: incompleteTasks.find(t => t.type === "Learning"),
            practice: incompleteTasks.find(t => t.type === "Practice"),
            project: incompleteTasks.find(t => t.type === "Project")
        };
    }, [activeLevelObj, allCompletedTasks]);

    if (loading) return <div className="p-8 text-[var(--text-primary)] flex justify-center items-center gap-3 h-screen"><Flame className="animate-bounce text-[#EA580C]" /> Loading your progress...</div>;

    const totalLevelsCompleted = roadmapData.levels.filter(l => calculateLevelProgress(l.id) === 100).length;

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-32">

            {/* Task Detail Modal */}
            <TaskDetail
                task={activeTask}
                isCompleted={activeTask ? allCompletedTasks.includes(activeTask.id) : false}
                onComplete={() => toggleTask(activeTask.id, activeTask.xp)}
                onClose={() => setActiveTask(null)}
            />

            {/* Clean Hero Panel */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-[var(--border-color)] relative overflow-hidden">
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 rounded-full bg-[#F8F9FA] border border-[var(--border-color)] text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                                {profile.skillLevel || "Beginner"} • {profile.goal || "Learning"}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                            Welcome back, {profile.name || profile.displayName || "Student"} 🚀
                        </h1>
                        <p className="text-[var(--text-secondary)] text-[15px] max-w-xl font-medium leading-relaxed mb-6">
                            You are building your future step by step. Keep completing daily missions to unlock new opportunities.
                        </p>

                        {/* Daily Mission UI */}
                        <div className="mt-6 flex flex-col gap-3">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Today's Missions</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {[dailyMissions.learning, dailyMissions.practice, dailyMissions.project].map((mission, idx) => {
                                    if(!mission) return null;
                                    const icons = [<Layers size={18} />, <Target size={18} />, <Trophy size={18} />];
                                    const colors = ['text-blue-500', 'text-emerald-500', 'text-[#EA580C]'];
                                    return (
                                        <div key={mission.id || idx} className="bg-[#F8F9FA] border border-[var(--border-color)] p-4 rounded-xl flex-1 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => {
                                            const owningModule = activeLevelObj.modules.find(m => m.tasks.some(t => t.id === mission.id));
                                            if (owningModule) setActiveModuleId(owningModule.id);
                                            setActiveTask(mission);
                                        }}>
                                            <div className={`flex items-center gap-2 mb-2 ${colors[idx]}`}>
                                                {icons[idx]}
                                                <span className="text-xs font-bold uppercase">{mission.type}</span>
                                            </div>
                                            <p className="font-bold text-[var(--text-primary)] text-sm leading-tight">{mission.title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Top Stat Cards */}
                    <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto">
                        <div className="flex-1 lg:flex-none w-full sm:w-auto bg-[#F8F9FA] border border-[var(--border-color)] px-6 py-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="text-emerald-500" size={18} />
                                <p className="text-[11px] text-[var(--text-secondary)] uppercase font-bold tracking-widest">Mastered</p>
                            </div>
                            <p className="text-3xl font-bold text-[var(--text-primary)]">{totalLevelsCompleted} <span className="text-base text-gray-400">/ {roadmapData.levels.length}</span></p>
                        </div>
                        <div className="flex-1 lg:flex-none w-full sm:w-auto bg-[#F8F9FA] border border-[var(--border-color)] px-6 py-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="text-[#EA580C]" size={18} />
                                <p className="text-[11px] text-[var(--text-secondary)] uppercase font-bold tracking-widest">Day Streak</p>
                            </div>
                            <p className="text-3xl font-bold text-[var(--text-primary)]">{streak}</p>
                        </div>
                        <div className="flex-1 lg:flex-none w-full sm:w-auto bg-[#F8F9FA] border border-[var(--border-color)] px-6 py-5 rounded-xl flex flex-col justify-center shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="text-yellow-500" size={18} fill="currentColor" />
                                <p className="text-[11px] text-[var(--text-secondary)] uppercase font-bold tracking-widest">Total XP</p>
                            </div>
                            <p className="text-3xl font-bold text-[var(--text-primary)]">{xp}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level Selection Grid - Only show when NOT inside a module */}
            {!activeModuleId && (
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] tracking-tight">
                            <Map className="text-blue-500" size={24} /> Year-wise Journey
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
            <div className="bg-white rounded-xl border border-[var(--border-color)] relative overflow-hidden shadow-sm mt-8">
                {/* Dynamic Header */}
                <div className="p-6 md:p-8 border-b border-[var(--border-color)] bg-[#F8F9FA]">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            {activeModuleId ? (
                                <div>
                                    <button
                                        onClick={() => setActiveModuleId(null)}
                                        className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors bg-white px-4 py-2 rounded-full border border-[var(--border-color)] shadow-sm"
                                    >
                                        <ArrowLeft size={16} /> Back to Modules
                                    </button>
                                    <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] tracking-tight">
                                        <Layers className="text-blue-500" size={24} /> {activeModuleObj?.title}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] text-sm mt-2 font-medium">{activeModuleObj?.description}</p>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] tracking-tight">
                                            <Target className="text-blue-500" size={24} /> {activeLevelObj?.title} Modules
                                        </h2>
                                    </div>
                                    <p className="text-[var(--text-secondary)] text-sm font-medium">{activeLevelObj?.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl border border-[var(--border-color)] shadow-sm min-w-[200px]">
                            <span className="font-bold text-emerald-600 text-xl tracking-tighter">
                                {Math.round(activeModuleId ? calculateModuleProgress(activeModuleObj) : calculateLevelProgress(activeLevelId))}%
                            </span>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${activeModuleId ? calculateModuleProgress(activeModuleObj) : calculateLevelProgress(activeLevelId)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8 min-h-[400px]">
                    {!activeModuleId ? (
                        <>
                            {/* Semester Toggle for Level 1 */}
                            {activeLevelId === "level_1" && (
                                <div className="flex items-center gap-4 mb-6">
                                    <button 
                                        onClick={() => setActiveSemester(1)}
                                        className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${activeSemester === 1 ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-[var(--text-secondary)] border border-[var(--border-color)] hover:bg-gray-50'}`}
                                    >
                                        Semester 1
                                    </button>
                                    <button 
                                        onClick={() => setActiveSemester(2)}
                                        className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${activeSemester === 2 ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-[var(--text-secondary)] border border-[var(--border-color)] hover:bg-gray-50'}`}
                                    >
                                        Semester 2
                                    </button>
                                </div>
                            )}

                            {/* Module Selection Grid Matrix */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activeLevelObj?.modules?.filter((_, index) => activeLevelId !== "level_1" || (activeSemester === 1 ? index < 5 : index >= 5)).map((module) => (
                                    <ModuleCard
                                        key={module.id}
                                        module={module}
                                        isComplete={calculateModuleProgress(module) === 100}
                                        progressPercent={calculateModuleProgress(module)}
                                        onClick={() => setActiveModuleId(module.id)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Task Item List Matrix */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activeModuleObj?.tasks?.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    isCompleted={allCompletedTasks.includes(task.id)}
                                    onToggle={() => setActiveTask(task)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
