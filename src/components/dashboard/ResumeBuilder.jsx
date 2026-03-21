import { FileText, Download, Edit3, Settings, Eye } from "lucide-react";

export default function ResumeBuilder() {
    return (
        <div className="pb-32 h-[calc(100vh-2rem)] flex flex-col">
            <div className="mb-6 flex justify-between items-end shrink-0">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <FileText className="text-fuchsia-400" size={36} /> Live Resume
                    </h1>
                    <p className="text-zinc-400 mt-2 font-medium">ATS-optimized markdown editor syncing directly to your projects.</p>
                </div>
                <button className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-fuchsia-600/20">
                    <Download size={18} /> Export PDF
                </button>
            </div>

            <div className="flex-1 flex gap-6 min-h-0">

                {/* Editor Panel */}
                <div className="w-1/2 glass-panel rounded-[2rem] border border-white/5 bg-zinc-950/60 p-6 flex flex-col">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                        <button className="flex items-center gap-2 text-white font-bold bg-zinc-800 px-4 py-2 rounded-lg"><Edit3 size={16} /> Content</button>
                        <button className="flex items-center gap-2 text-zinc-500 font-bold hover:text-zinc-300 px-4 py-2"><Settings size={16} /> Design</button>
                    </div>

                    <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Personal Info</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Full Name" defaultValue="Niran Student" className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" />
                                <input type="text" placeholder="Title" defaultValue="Frontend Engineer" className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest mt-8">Experience</h3>
                            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4">
                                <p className="text-sm text-zinc-400 mb-2">Google Software Engineering Intern</p>
                                <textarea className="w-full h-24 bg-zinc-950 border border-white/5 rounded-lg p-3 text-zinc-300 text-sm focus:outline-none focus:border-fuchsia-500" defaultValue="- Optimized critical rendering path decreasing TTI by 30%.\n- Authored comprehensive unit tests leading to 95% coverage."></textarea>
                            </div>
                            <button className="w-full py-3 border border-dashed border-white/10 hover:bg-white/5 rounded-xl text-zinc-500 font-bold text-sm transition-all">+ Add Experience</button>
                        </div>
                    </div>
                </div>

                {/* Live Preview Panel */}
                <div className="w-1/2 bg-white rounded-[2rem] p-10 shadow-2xl overflow-y-auto">
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-4xl font-black text-black mb-1">Niran Student</h1>
                        <p className="text-lg text-zinc-600 mb-6 font-medium">Frontend Engineer • niran@example.com</p>

                        <hr className="border-black mb-6 border-t-2" />

                        <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-widest">Experience</h2>
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="font-bold text-lg text-black">Google Software Engineering Intern</h3>
                                <span className="text-zinc-500 font-medium">May 2024 - Aug 2024</span>
                            </div>
                            <ul className="list-disc list-inside text-zinc-800 space-y-2 leading-relaxed">
                                <li>Optimized critical rendering path decreasing TTI by 30%.</li>
                                <li>Authored comprehensive unit tests leading to 95% coverage.</li>
                            </ul>
                        </div>

                        <hr className="border-zinc-300 mb-6" />

                        <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-widest">Education</h2>
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="font-bold text-lg text-black">University of Technology</h3>
                                <span className="text-zinc-500 font-medium">Expected May 2026</span>
                            </div>
                            <p className="text-zinc-800">B.S. in Computer Science • GPA: 3.8/4.0</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
