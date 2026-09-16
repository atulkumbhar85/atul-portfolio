'use client';

import { InView } from '@/components/motion-primitives/in-view';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from '@/components/motion-primitives/morphing-dialog';

const projects = [
  {
    title: '3D Animated Portfolio',
    description:
      'A modern portfolio website featuring scroll-driven motion, immersive transitions, and a focused user experience.',
    technologies: ['React', 'Next.js', 'Motion', 'Tailwind'],
  },
  {
    title: 'Task Manager Pro',
    description:
      'A full-stack task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
  },
  {
    title: 'E-Commerce Platform',
    description:
      'A complete e-commerce solution with payment integration, inventory management, and admin dashboard.',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
  },
  {
    title: 'Weather Analytics App',
    description:
      'An interactive weather application with data visualization, forecasting, and location-based services.',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Charts.js'],
  },
];

function ProjectCard({ project }) {
  return (
    <MorphingDialog
      transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}
    >
      <MorphingDialogTrigger className="w-full text-left border border-border bg-surface/50 p-6 md:p-8 hover:border-accent/50 transition-colors group">
        <MorphingDialogTitle className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors">
          {project.title}
        </MorphingDialogTitle>
        <p className="mt-3 text-muted text-sm line-clamp-2">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs text-muted border border-border px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="relative w-[min(92vw,560px)] border border-border bg-bg p-8 md:p-10 shadow-2xl">
          <MorphingDialogClose className="absolute top-4 right-4 text-muted hover:text-accent" />
          <MorphingDialogTitle className="font-display text-3xl font-bold text-ink pr-10">
            {project.title}
          </MorphingDialogTitle>
          <MorphingDialogDescription
            className="mt-4 space-y-4"
            disableLayoutAnimation
            variants={{
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 12 },
            }}
          >
            <p className="text-muted leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-accent border border-accent/30 px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </MorphingDialogDescription>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">
            Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-14">
            Selected projects
          </h2>
        </InView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project) => (
            <InView
              key={project.title}
              once
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ProjectCard project={project} />
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
