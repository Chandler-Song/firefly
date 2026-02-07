import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import * as Icons from 'lucide-react'
import Interview from '../components/Interview'
import { getModuleContent, Post } from '../utils/markdown'
import socialLinks from '../data/social.json'
import profileConfig from '../data/profile.json'
import type { SocialLink, ProfileConfig } from '../types'

export default function Home() {
  const [latestInterview, setLatestInterview] = useState<Post | null>(null)

  useEffect(() => {
    getModuleContent('interviews').then(res => {
      if (res && res.length > 0) {
        setLatestInterview(res[0])
      }
    })
  }, [])

  // 过滤首页显示的社交链接
  const homePageSocials = (socialLinks as SocialLink[]).filter(
    link => link.showInHomePage !== false
  )

  const profile = profileConfig as ProfileConfig

  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-10">
        {/* 头像 */}
        {profile.avatar.enabled && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full opacity-60 group-hover:opacity-80 blur-sm transition-all duration-500"></div>
            <div className="relative">
              <img
                src={profile.avatar.path.startsWith('http') ? profile.avatar.path : `${import.meta.env.BASE_URL}${profile.avatar.path.replace(/^\//, '')}`}
                alt={profile.avatar.alt}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-border/50 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-muted/80 to-muted/40 border-2 border-border/50 shadow-lg flex items-center justify-center">
                        <svg class="w-16 h-16 md:w-20 md:h-20 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    `
                  }
                }}
              />
            </div>
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">

        战略人才洞察 | 技术驱动招聘 | 顶尖人才猎手

        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px]">
        致力于洞察与链接全球顶尖人才，通过分享最前沿的行业洞见，构建持续进化、赋能增长的人才生态系统。
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
          {homePageSocials.map((social) => {
            const Icon = (Icons as any)[social.icon] || Icons.Link
            return (
              <a
                key={social.platform}
                href={social.url}
                target={social.openInNewTab !== false ? '_blank' : '_self'}
                rel={social.openInNewTab !== false ? 'noopener noreferrer' : undefined}
                aria-label={social.ariaLabel || `访问 ${social.platform}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={24} />
              </a>
            )
          })}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: '知识分享', desc: '碎片化的经验总结与技巧分享', path: '/knowledge' },
          { title: '博客文章', desc: '深度的技术长文与架构思考', path: '/blog' },
          { title: '行业洞察', desc: '前沿趋势分析与季度总结', path: '/insights' },
          { title: '对话访谈', desc: '深度对话先锋，还原决策逻辑', path: '/interviews' },
          { title: '工具库', desc: '开源项目与实用开发工具推荐', path: '/tools' },
          { title: '读书笔记', desc: '专业书籍的精要摘录与心得', path: '/notes' },
          { title: '图表可视化', desc: '数据驱动的视觉表达探索', path: '/visualization' },
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

      {/* Interview Module */}
      {latestInterview && (
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
              <MessageCircle size={16} />
              <span>对话大咖</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">深度对话访谈</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
              汇聚行业先锋，探讨技术前沿。通过面对面沟通，洞察行业背后的逻辑与智慧。
            </p>
          </div>
          
          <div className="relative group cursor-pointer" onClick={() => window.location.href = `/interviews/${latestInterview.slug}`}>
            <Interview 
              guest={{
                name: latestInterview.guestName,
                title: latestInterview.guestTitle,
                organization: latestInterview.guestOrg,
                avatar: latestInterview.guestAvatar,
                description: latestInterview.guestDescription,
                achievements: latestInterview.guestAchievements || []
              }}
              records={latestInterview.interviewRecords || []}
              multimedia={latestInterview.multimedia || []}
            />
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              {/* <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                点击阅读完整访谈
              </div> */}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
