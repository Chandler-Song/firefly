import resumeData from '../data/resume.json'
import { Briefcase, GraduationCap, Code } from 'lucide-react'

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Briefcase className="text-primary" /> 工作经历
        </h2>
        <div className="space-y-8">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="relative pl-6 border-l-2 border-muted hover:border-primary transition-colors">
              <div className="absolute w-3 h-3 bg-muted rounded-full -left-[7px] top-1.5 group-hover:bg-primary" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-primary font-medium mb-3">{exp.company}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Code className="text-primary" /> 技能清单
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="rounded-lg border p-6">
              <h3 className="font-bold mb-4 text-lg">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <GraduationCap className="text-primary" /> 教育背景
        </h2>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="rounded-lg border p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{edu.school}</h3>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </div>
              <p className="text-muted-foreground">{edu.degree}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
