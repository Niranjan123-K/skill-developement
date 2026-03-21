import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Code, Target, Zap } from "lucide-react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Onboarding() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        goal: "",
        skillLevel: "",
        interest: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                setDoc(userRef, {
                    goal: formData.goal,
                    skillLevel: formData.skillLevel,
                    interest: formData.interest,
                    onboardingCompleted: true
                }, { merge: true }).catch(error => console.error(error));
            }
            localStorage.setItem("userProfile", JSON.stringify(formData));

            // Artificial tiny delay for UX feedback (optional, but snappy is better)
            navigate("/recommendation", { state: { skillLevel: formData.skillLevel } });
        } catch (error) {
            console.error("Error saving onboarding data: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-color)] p-4 relative overflow-hidden transition-colors duration-300 dark">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-lg glass-panel p-8 rounded-2xl shadow-2xl relative z-10 border border-[var(--border-color)] my-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-2">
                        Let's personalize your path
                    </h1>
                    <p className="text-[var(--text-secondary)]">Complete your profile to get a customized roadmap.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[var(--text-primary)] block">What is your primary goal?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {["Get a job", "Build a startup", "Learn new skills", "Freelance"].map((g) => (
                                <button
                                    type="button"
                                    key={g}
                                    onClick={() => setFormData({ ...formData, goal: g })}
                                    className={`p-3 rounded-xl border transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 ${formData.goal === g
                                        ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                        : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-blue-400/50 hover:bg-[var(--border-color)]"
                                        }`}
                                >
                                    <Target size={16} className={formData.goal === g ? "text-blue-400" : "text-[var(--text-secondary)]"} /> {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[var(--text-primary)] block">Current Skill Level</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {["Beginner", "Intermediate", "Advanced"].map((s) => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() => setFormData({ ...formData, skillLevel: s })}
                                    className={`p-3 rounded-xl border transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 ${formData.skillLevel === s
                                        ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                                        : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-amber-400/50 hover:bg-[var(--border-color)]"
                                        }`}
                                >
                                    <Zap size={16} className={formData.skillLevel === s ? "text-amber-400" : "text-[var(--text-secondary)]"} /> {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[var(--text-primary)] block">Career Interest</label>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {["Web Dev", "AI / ML", "Data Science", "App Dev", "Cybersecurity", "Other"].map((interest) => (
                                <button
                                    type="button"
                                    key={interest}
                                    onClick={() => setFormData({ ...formData, interest })}
                                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${formData.interest === interest
                                        ? "bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                        : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-purple-400/50 hover:bg-[var(--border-color)]"
                                        }`}
                                >
                                    <Code size={20} className={formData.interest === interest ? "text-purple-400" : "text-[var(--text-secondary)]"} />
                                    <span className="text-xs font-semibold">{interest}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!formData.goal || !formData.interest || !formData.skillLevel || loading}
                        className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 active:scale-[0.98] flex justify-center items-center"
                    >
                        {loading ? "Saving..." : "Generate My Roadmap"}
                    </button>
                </form>
            </div>
        </div>
    );
}
