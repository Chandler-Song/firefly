import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          打造具有影响力的<span className="text-primary">专业个人品牌</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px]">
          专注于前端开发与架构，致力于分享技术洞察与实战经验。
          通过模块化知识体系，构建持续生长的内容生态。
        </p>
        <div className="flex gap-4">
          <Link to="/resume" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            查看简历 <ArrowRight className="ml-2" size={16} />
          </Link>
          <Link to="/blog" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            阅读博客
          </Link>
        </div>
        <div className="flex gap-6 mt-4">
           <a href="#" className="text-muted-foreground hover:text-primary"><Github size={24} /></a>
           <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={24} /></a>
           <a href="#" className="text-muted-foreground hover:text-primary"><Mail size={24} /></a>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: '知识分享', desc: '碎片化的经验总结与技巧分享', path: '/knowledge' },
          { title: '博客文章', desc: '深度的技术长文与架构思考', path: '/blog' },
          { title: '行业洞察', desc: '前沿趋势分析与季度总结', path: '/insights' },
          { title: '工具库', desc: '开源项目与实用开发工具推荐', path: '/tools' },
          { title: '读书笔记', desc: '专业书籍的精要摘录与心得', path: '/books' },
          { title: '个人成就', desc: '权威认证、奖项与里程碑', path: '/achievements' },
        ].map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-all hover:shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary">{module.title}</h3>
            <p className="text-muted-foreground text-sm">{module.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
