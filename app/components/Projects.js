// app/components/Projects.js
const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "A responsive website showcasing my professional skills and achievements.",
        },
        {
            title: "Task Manager App",
            description: "A full-stack web application for managing daily tasks effectively.",
        },
    ];

    return (
        <section id="projects" className="bg-gray-100 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Projects</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 w-80 hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-600">{project.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
