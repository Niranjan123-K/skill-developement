import * as l from 'lucide-react';

const coreIcons = ['Flame', 'Zap', 'Trophy', 'Target', 'Star', 'Lock', 'Check', 'BrainCircuit', 'Rocket', 'Briefcase', 'FileText', 'Play', 'Code', 'GitBranch', 'Layers', 'Database', 'Sparkles', 'MoveRight', 'ArrowRight', 'LayoutDashboard', 'Map', 'TrendingUp', 'Award', 'GraduationCap'];

const missing = coreIcons.filter(x => !l[x]);
console.log('Missing imports:', missing);
