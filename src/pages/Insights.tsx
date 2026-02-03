import { useState, useEffect, useMemo } from 'react'
import { TrendingUp, BarChart, Calendar, ChevronRight, Lightbulb, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import ModuleLayout from '../components/ModuleLayout'

export default function Insights() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  useEffect(() => {
    getModuleContent('insights')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取洞察列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 提取所有话题分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[]
    return ['全部', ...cats]
  }, [items])

  // 过滤内容
  const filteredItems = useMemo(() => {
    if (selectedCategory === '全部') return items
    return items.filter(item => item.category === selectedCategory)
  }, [items, selectedCategory])

  // 最近更新
  const recentItems = useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }, [items])

  const sidebar = (
    <>
      {/* 话题分类 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Lightbulb size={16} className="text-primary" />
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
                ({cat === '全部' ? items.length : items.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 最近更新 */}
      {recentItems.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            最近更新
          </h3>
          <div className="space-y-2">
            {recentItems.map(item => (
              <Link
                key={item.slug}
                to={`/insights/${item.slug}`}
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
          <BarChart size={14} /> 洞察统计
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-xs text-muted-foreground">洞察文章</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-xs text-muted-foreground">话题领域</div>
          </div>
        </div>
      </div>
    </>
  )

  const content = filteredItems.length === 0 ? (
    <div className="p-8 rounded-2xl border bg-gradient-to-br from-background to-muted text-center text-muted-foreground">
      {loading ? '加载中...' : '思考中... 稍后发布。'}
    </div>
  ) : (
    <div className="grid gap-6 md:gap-8">
      {filteredItems.map((item) => (
        <Link to={`/insights/${item.slug}`} key={item.slug} className="block group">
          <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/30 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <BarChart size={18} /> {item.category || '趋势报告'}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <Calendar size={12} /> {item.date}
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed line-clamp-2">
              {item.summary}
            </p>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              阅读全文 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

  return (
    <ModuleLayout
      title="行业洞察"
      description="深入解读技术趋势与行业变化，洞察未来发展方向"
      icon={<TrendingUp className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="one"
    >
      {content}
    </ModuleLayout>
  )
}
