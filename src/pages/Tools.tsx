import { Github, ExternalLink, Briefcase } from 'lucide-react'

const projects = [
  {
    name: 'Smart-Portfolio-Starter',
    description: '一个基于 React 18 的高性能个人主页模板，支持 MDX 和自动部署。',
    techStack: ['React', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com',
    liveDemo: '#'
  },
  {
    name: 'Auto-Doc-Generator',
    description: '自动化代码文档生成工具，支持多种编程语言。',
    techStack: ['Node.js', 'Go', 'Markdown'],
    githubUrl: 'https://github.com',
    liveDemo: '#'
  }
]

export default function Tools() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Briefcase className="text-primary" /> 工具资源库
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.name} className="flex flex-col rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[10px] bg-muted px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.githubUrl} className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                <Github size={16} /> Source
              </a>
              <a href={project.liveDemo} className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                <ExternalLink size={16} /> Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
