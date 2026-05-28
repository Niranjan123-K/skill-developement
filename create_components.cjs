const fs = require('fs');
const path = require('path');

const components = [
    { name: 'DailyTasks', title: 'Daily Tasks' },
    { name: 'CodingPractice', title: 'Coding Practice' },
    { name: 'Aptitude', title: 'Aptitude Prep' },
    { name: 'Resources', title: 'Study Materials' },
    { name: 'Communication', title: 'Communication Skills' }
];

components.forEach(comp => {
    const content = `export default function ${comp.name}() {
    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-32">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">${comp.title}</h1>
            <p className="text-[var(--text-secondary)]">This section is under construction.</p>
        </div>
    );
}`;
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'dashboard', `${comp.name}.jsx`), content);
});

console.log('Created 5 placeholder components.');
