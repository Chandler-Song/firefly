import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import { MessageCircle, Calendar, ArrowRight, User } from 'lucide-react'

export default function Interviews() {
  const [interviews, setInterviews] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('interviews').then(res => {
      setInterviews(res)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="max-w-6xl mx-auto py-20 text-center animate-pulse">加载中...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">对话访谈</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          汇聚行业先锋，探讨技术前沿。通过深度对话，还原技术决策背后的逻辑与思考。
        </p>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-muted/20">
          <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
          <p className="text-muted-foreground">暂无访谈内容</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interviews.map((item) => (
            <Link
              key={item.slug}
              to={`/interviews/${item.slug}`}
              className="group flex flex-col bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-all hover:border-primary/50"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
                  <Calendar size={14} /> {item.date}
                </div>
                
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-muted-foreground mb-8 line-clamp-3 flex-grow">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between pt-6 border-t mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-muted bg-muted">
                      <img src={item.guestAvatar} alt={item.guestName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-none">{item.guestName}</span>
                      <span className="text-xs text-muted-foreground mt-1">{item.guestTitle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                    查看详情 <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
