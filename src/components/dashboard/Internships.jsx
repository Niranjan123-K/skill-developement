import { GraduationCap, Building2, MapPin, DollarSign, ExternalLink } from "lucide-react";

export default function Internships() {
    const jobs = [
        { id: 1, role: 'Frontend Intern', company: 'Google', location: 'Remote', pay: '$45/hr', match: 92, status: 'Interviewing', logo: 'G' },
        { id: 2, role: 'Cloud Engineer Intern', company: 'AWS', location: 'Seattle, WA', pay: '$50/hr', match: 85, status: 'Applied', logo: 'A' },
        { id: 3, role: 'Fullstack Intern', company: 'Stripe', location: 'San Francisco, CA', pay: '$60/hr', match: 78, status: 'Saved', logo: 'S' },
    ];

    return (
        <div className="pb-32">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <GraduationCap className="text-blue-400" size={36} /> Placement Portal
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">Track your applications and discover high-match roles.</p>
                </div>
            </div>

            <div className="space-y-4">
                {jobs.map((job, idx) => (
                    <motion.div
                        key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-6 rounded-3xl border border-white/5 bg-zinc-950/50 hover:bg-zinc-900/50 transition-colors flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-2xl font-black text-white shadow-lg border border-white/10">
                            {job.logo}
                        </div>

                        <div className="flex-1 md:pr-12">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white tracking-tight">{job.role}</h3>
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${job.status === 'Interviewing' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
                                    {job.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
                                <span className="flex items-center gap-1.5"><Building2 size={16} /> {job.company}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                                <span className="flex items-center gap-1.5"><DollarSign size={16} /> {job.pay}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Match</p>
                                <p className="text-xl font-black text-emerald-400">{job.match}%</p>
                            </div>
                            <button className="flex-1 md:flex-none px-6 py-4 bg-white hover:bg-zinc-200 text-black rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors">
                                View Role <ExternalLink size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
