import { TrendingUp, Award, Target } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Progress() {
    const skillData = [
        { subject: 'Programming', A: 80, fullMark: 100 },
        { subject: 'Web Dev', A: 65, fullMark: 100 },
        { subject: 'Aptitude', A: 50, fullMark: 100 },
        { subject: 'Communication', A: 70, fullMark: 100 },
        { subject: 'DSA', A: 40, fullMark: 100 },
    ];

    const weeklyData = [
        { name: 'Mon', hours: 2 },
        { name: 'Tue', hours: 3 },
        { name: 'Wed', hours: 1 },
        { name: 'Thu', hours: 4 },
        { name: 'Fri', hours: 2 },
        { name: 'Sat', hours: 5 },
        { name: 'Sun', hours: 3 },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-32">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3 text-[var(--text-primary)] tracking-tight">
                    <TrendingUp className="text-blue-500" size={28} /> Progress Analytics
                </h1>
                <p className="text-[var(--text-secondary)] mt-2 font-medium">Deep dive into your performance metrics and skill progression.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skill Radar Chart */}
                <div className="bg-white p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Award className="text-emerald-500" size={20} /> Skill Distribution
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar name="Student" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Weekly Hours Bar Chart */}
                <div className="bg-white p-6 rounded-xl border border-[var(--border-color)] shadow-sm">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <Target className="text-[#EA580C]" size={20} /> Weekly Study Hours
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
