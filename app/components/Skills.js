// app/components/Skills.js
import styles from './Skills.module.css';

// app/components/Skills.js
const Skills = () => {
    const skills = ["JavaScript", "React.js", "Next.js", "Node.js", "HTML & CSS"];

    return (
        <section id="skills" className="bg-white py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Skills</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {skills.map((skill) => (
                    <div key={skill} className="bg-blue-100 text-blue-800 px-6 py-4 rounded-lg shadow-md">
                        {skill}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;

