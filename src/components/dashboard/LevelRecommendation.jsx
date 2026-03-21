import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Layers, Target, CheckCircle2 } from "lucide-react";
import roadmapData from "../../data/roadmapData.json";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function LevelRecommendation() {
    const location = useLocation();
    const navigate = useNavigate();
    const skillLevel = location.state?.skillLevel || "Beginner";
    const [selectedLevelId, setSelectedLevelId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (skillLevel === "Advanced") setSelectedLevelId("level_3");
        else if (skillLevel === "Intermediate") setSelectedLevelId("level_2");
        else setSelectedLevelId("level_1");
    }, [skillLevel]);

    const handleConfirm = () => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                setDoc(userRef, { currentLevelId: selectedLevelId }, { merge: true }).catch(err => console.error(err));
            }
            // persist locally
            const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");
            profile.currentLevelId = selectedLevelId;
            localStorage.setItem("userProfile", JSON.stringify(profile));

            navigate("/dashboard");
        } catch (error) {
            console.error("Error setting level", error);
        } finally {
            setLoading(false);
        }
    };

    const recommendedLevelId = skillLevel === "Advanced" ? "level_3" : skillLevel === "Intermediate" ? "level_2" : "level_1";

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-color)] p-4 relative overflow-hidden transition-colors duration-300 dark flex-col">
            {/* Ambient Background */}
            <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-5xl glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10 border border-[var(--border-color)]">
                <div className="text-center mb-10 text-white">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-3">Your Recommended Path</h1>
                    <p className="text-[var(--text-secondary)] text-lg">Based on your {skillLevel} skill level, we recommend starting here. You can freely change this later.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {roadmapData.levels.map((level) => {
                        const isRecommended = level.id === recommendedLevelId;
                        const isSelected = level.id === selectedLevelId;
                        return (
                            <div
                                key={level.id}
                                onClick={() => setSelectedLevelId(level.id)}
                                className={`cursor-pointer group relative p-6 rounded-3xl border transition-all duration-300 ${isSelected ? 'bg-indigo-900/40 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'bg-zinc-900/50 border-white/5 hover:border-white/20'}`}
                            >
                                {isRecommended && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                        Recommended
                                    </div>
                                )}
                                {isSelected && <CheckCircle2 className="absolute top-4 right-4 text-indigo-400" size={20} />}
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'}`}>
                                    <Layers size={24} />
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-zinc-200'}`}>{level.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{level.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleConfirm}
                        disabled={loading || !selectedLevelId}
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center gap-3 text-lg group active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Setting up..." : "Confirm & Start Journey"}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
