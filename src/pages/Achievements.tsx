import { useState, useEffect } from 'react'
import { Award, CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'

export default function Achievements() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModuleContent('achievements')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取成就列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center">加载中...</div>

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
        <Award className="text-primary" /> 荣誉成就
      </h1>
      <div className="relative border-l-2 border-muted ml-4 pl-8 space-y-12">
        {items.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed text-center text-muted-foreground">
            里程碑记录中...
          </div>
        ) : (
          items.map((item) => (
            <div key={item.slug} className="relative">
              <div className="absolute -left-[41px] top-0 bg-background p-1">
                <CheckCircle className="text-primary" size={24} />
              </div>
              <Link to={`/achievements/${item.slug}`} className="block group">
                <div className="p-6 rounded-xl border bg-card group-hover:border-primary transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-primary font-bold uppercase tracking-widest">{item.date}</span>
                    <span className="flex items-center text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      详情 <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 mt-1">{item.summary || item.issuer}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
