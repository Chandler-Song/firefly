import resumeData from '../data/resume.json'
import profileConfig from '../data/profile.json'
import type { ProfileConfig, ResumeData } from '../types'
import { Briefcase, GraduationCap, Code, FolderGit2, Award, MapPin, ExternalLink } from 'lucide-react'

export default function Resume() {
  const profile = profileConfig as ProfileConfig
  const resume = resumeData as ResumeData

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      {/* 个人信息头部 */}
      {profile.avatar.enabled && (
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-muted/30 via-muted/10 to-transparent">
          {/* 头像 */}
          <div className="relative flex-shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-full opacity-50 group-hover:opacity-70 blur-sm transition-all duration-500"></div>
            <div className="relative">
              <img
                src={profile.avatar.path.startsWith('http') ? profile.avatar.path : `${import.meta.env.BASE_URL}${profile.avatar.path.replace(/^\//, '')}`}
                alt={profile.avatar.alt}
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-border/50 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/20"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-muted/80 to-muted/40 border-2 border-border/50 shadow-md flex items-center justify-center">
                        <svg class="w-16 h-16 md:w-18 md:h-18 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    `
                  }
                }}
              />
            </div>
          </div>

          {/* 个人信息 */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
            <p className="text-xl text-primary font-medium mb-3">{profile.title}</p>
            <p className="text-muted-foreground">{profile.subtitle}</p>
          </div>
        </section>
      )}

      {/* 工作经历 */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Briefcase className="text-primary" /> 工作经历
        </h2>
        <div className="space-y-8">
          {resume.experience.map((exp, index) => (
            <div key={index} className="relative pl-6 border-l-2 border-muted hover:border-primary transition-colors group">
              <div className="absolute w-3 h-3 bg-muted rounded-full -left-[7px] top-1.5 group-hover:bg-primary transition-colors" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-primary font-medium mt-1">{exp.company}</p>
                </div>
                <div className="text-sm text-muted-foreground mt-1 md:mt-0 md:text-right">
                  <p>{exp.period}</p>
                  {exp.location && (
                    <p className="flex items-center gap-1 mt-1 md:justify-end">
                      <MapPin size={14} />
                      {exp.location}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">工作职责：</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </div>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">主要成就：</h4>
                    <ul className="list-disc list-inside space-y-1.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm leading-relaxed text-foreground font-medium">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 项目经验 */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FolderGit2 className="text-primary" /> 项目经验
        </h2>
        <div className="space-y-8">
          {resume.projects.map((project, index) => (
            <div key={index} className="rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        aria-label="项目链接"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.role} | {project.period}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">项目亮点：</h4>
                <ul className="list-disc list-inside space-y-1.5">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted-foreground">{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 技能清单 */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Code className="text-primary" /> 技能清单
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(resume.skills).map(([category, skills]) => (
            <div key={category} className="rounded-lg border border-border/50 p-5 hover:border-primary/50 transition-colors">
              <h3 className="font-bold mb-3 text-base">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 教育背景 */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <GraduationCap className="text-primary" /> 教育背景
        </h2>
        <div className="space-y-6">
          {resume.education.map((edu, index) => (
            <div key={index} className="rounded-lg border border-border/50 p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{edu.school}</h3>
                  <p className="text-muted-foreground mt-1">
                    {edu.degree}{edu.major && ` · ${edu.major}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-sm text-muted-foreground mt-2 md:mt-0">{edu.period}</span>
              </div>
              
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">学术成就：</h4>
                  <ul className="list-disc list-inside space-y-1.5">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 荣誉证书 */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Award className="text-primary" /> 荣誉证书
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resume.certifications.map((cert, index) => (
            <div key={index} className="rounded-lg border border-border/50 p-5 hover:border-primary/50 transition-all hover:shadow-md">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-base flex-1">{cert.title}</h3>
                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors ml-2"
                    aria-label="证书链接"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground mb-2">{cert.date}</p>
              {cert.credentialId && (
                <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded inline-block">
                  {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
