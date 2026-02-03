import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import { MessageCircle, Calendar, ArrowRight, User, Users, Sparkles, Video } from 'lucide-react'
import ModuleLayout from '../components/ModuleLayout'

export default function Interviews() {
  const [interviews, setInterviews] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  useEffect(() => {
    getModuleContent('interviews').then(res => {
      setInterviews(res)
      setLoading(false)
    })
  }, [])

  // 提取所有分类（可以按嘉宾行业或话题分类）
  const categories = useMemo(() => {
    const cats = Array.from(new Set(interviews.map(item => item.category).filter(Boolean))) as string[]
    return ['全部', ...cats]
  }, [interviews])

  // 提取所有嘉宾
  const allGuests = useMemo(() => {
    const guests = Array.from(new Set(interviews.map(item => item.guestName).filter(Boolean)))
    return guests
  }, [interviews])

  // 过滤内容
  const filteredInterviews = useMemo(() => {
    if (selectedCategory === '全部') return interviews
    return interviews.filter(item => item.category === selectedCategory)
  }, [interviews, selectedCategory])

  // 最近更新
  const recentInterviews = useMemo(() => {
    return [...interviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }, [interviews])

  const sidebar = (
    <>
      {/* 话题分类 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <MessageCircle size={16} className="text-primary" />
          话题分类
        </h3>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat || '全部')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                ({cat === '全部' ? interviews.length : interviews.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 嘉宾列表 */}
      {allGuests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Users size={16} className="text-primary" />
            嘉宾阵容
          </h3>
          <div className="space-y-2">
            {allGuests.slice(0, 8).map(guest => (
              <div key={guest} className="flex items-center gap-2 text-sm text-muted-foreground">
                <User size={14} className="text-primary" />
                <span>{guest}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 最近更新 */}
      {recentInterviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            最近更新
          </h3>
          <div className="space-y-2">
            {recentInterviews.map(item => (
              <Link
                key={item.slug}
                to={`/interviews/${item.slug}`}
                className="block p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="text-xs text-muted-foreground mb-1">{item.date}</div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 统计信息 */}
      <div className="rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5">
          <Video size={14} /> 访谈统计
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{interviews.length}</div>
            <div className="text-xs text-muted-foreground">访谈期数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{allGuests.length}</div>
            <div className="text-xs text-muted-foreground">嘉宾数量</div>
          </div>
        </div>
      </div>
    </>
  )

  const content = filteredInterviews.length === 0 ? (
    <div className="text-center py-20 border rounded-xl bg-muted/20">
      <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
      <p className="text-muted-foreground">{loading ? '加载中...' : '暂无访谈内容'}</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {filteredInterviews.map((item) => (
        <Link
          key={item.slug}
          to={`/interviews/${item.slug}`}
          className="group flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 transition-all duration-300"
        >
          <div className="p-6 md:p-8 flex flex-col h-full">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
              <Calendar size={14} /> {item.date}
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 line-clamp-3 flex-grow leading-relaxed">
              {item.summary}
            </p>

            <div className="flex items-center justify-between pt-4 md:pt-6 border-t mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-muted bg-muted flex items-center justify-center">
                  {item.guestAvatar ? (
                    <img src={item.guestAvatar} alt={item.guestName} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-none">{item.guestName || '嘉宾'}</span>
                  <span className="text-xs text-muted-foreground mt-1">{item.guestTitle || '专家'}</span>
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
  )

  return (
    <ModuleLayout
      title="对话访谈"
      description="汇聚行业先锋，探讨技术前沿。通过深度对话，还原技术决策背后的逻辑与思考"
      icon={<MessageCircle className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="two"
    >
      {content}
    </ModuleLayout>
  )
}
