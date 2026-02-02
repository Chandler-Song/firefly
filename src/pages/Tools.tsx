import { useState, useEffect } from 'react'
import { Github, ExternalLink, Briefcase, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Tools() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('tools')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取工具列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Briefcase className="text-primary" /> 工具资源库
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground">
            工欲善其事，必先利其器。工具整理中...
          </div>
        ) : (
          items.map((item) => (
            <Link to={`/tools/${item.slug}`} key={item.slug} className="group">
              <div className="flex flex-col rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                    <Calendar size={12} /> {item.date}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">{item.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.techStack?.map((tech: string) => (
                    <span key={tech} className="text-[10px] bg-muted px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  详情介绍 <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
