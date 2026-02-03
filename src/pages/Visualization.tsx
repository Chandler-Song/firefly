import { useState, useEffect, useMemo } from 'react'
import { BarChart3, Calendar, ChevronRight, PieChart, LineChart, Layers, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import ModuleLayout from '../components/ModuleLayout'

export default function Visualization() {
  const [items, setItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  useEffect(() => {
    getModuleContent('visualization')
      .then(data => {
        setItems(data)
      })
      .catch(err => {
        console.error('获取可视化列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 提取所有分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.category).filter(Boolean))) as string[]
    return ['全部', ...cats]
  }, [items])

  // 提取所有标签
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    items.forEach(item => {
      item.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [items])

  // 过滤内容
  const filteredItems = useMemo(() => {
    if (selectedCategory === '全部') return items
    return items.filter(item => item.category === selectedCategory)
  }, [items, selectedCategory])

  // 统计图表类型
  const chartTypeStats = useMemo(() => {
    const stats: Record<string, number> = {}
    items.forEach(item => {
      const type = item.category || '其他'
      stats[type] = (stats[type] || 0) + 1
    })
    return Object.entries(stats).sort((a, b) => b[1] - a[1])
  }, [items])

  const sidebar = (
    <>
      {/* 图表类型 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Layers size={16} className="text-primary" />
          图表类型
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

      {/* 图表统计 */}
      {chartTypeStats.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <PieChart size={16} className="text-primary" />
            类型分布
          </h3>
          <div className="space-y-2">
            {chartTypeStats.map(([type, count]) => (
              <div key={type} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{type}</span>
                <span className="font-bold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 技术标签 */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <LineChart size={16} className="text-primary" />
            技术标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 10).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 统计信息 */}
      <div className="rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5">
          <Activity size={14} /> 可视化统计
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{items.length}</div>
            <div className="text-xs text-muted-foreground">图表数量</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
            <div className="text-xs text-muted-foreground">图表类型</div>
          </div>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          📊 数据可视化是一门艺术，通过图表让数据说话，发现隐藏的洞察。
        </p>
      </div>
    </>
  )

  const content = filteredItems.length === 0 ? (
    <div className="col-span-full p-12 text-center border border-dashed rounded-xl text-muted-foreground bg-muted/10">
      {loading ? '加载中...' : '探索数据之美...'}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {filteredItems.map((item) => (
        <Link to={`/visualization/${item.slug}`} key={item.slug} className="group">
          <article className="p-5 md:p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <BarChart3 size={12} />
                {item.category || 'Visualization'}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={12} /> {item.date}
              </div>
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow leading-relaxed">
              {item.summary}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all pt-4 border-t border-border/50">
              查看演示 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        </Link>
      ))}
    </div>
  )

  return (
    <ModuleLayout
      title="图表可视化"
      description="数据驱动，视觉呈现。通过图表探索数据背后的故事与洞察"
      icon={<BarChart3 className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="two"
    >
      {content}
    </ModuleLayout>
  )
}
