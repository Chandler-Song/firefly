import { useState, useEffect, useMemo } from 'react'
import { Calendar, Tag, Clock, FileText, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getModuleContent, Post } from '../utils/markdown'
import ModuleLayout from '../components/ModuleLayout'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string>('全部')

  useEffect(() => {
    getModuleContent('blog')
      .then(data => {
        setPosts(data)
      })
      .catch(err => {
        console.error('获取博客列表失败:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 提取所有标签及其数量
  const tagStats = useMemo(() => {
    const tagCount = new Map<string, number>()
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
      })
    })
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }))
  }, [posts])

  // 按年份分组
  const postsByYear = useMemo(() => {
    const groups = new Map<string, Post[]>()
    posts.forEach(post => {
      const year = post.date.split('-')[0] || '未知'
      if (!groups.has(year)) {
        groups.set(year, [])
      }
      groups.get(year)!.push(post)
    })
    return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [posts])

  // 过滤博客
  const filteredPosts = useMemo(() => {
    if (selectedTag === '全部') return posts
    return posts.filter(post => post.tags?.includes(selectedTag))
  }, [posts, selectedTag])

  const sidebar = (
    <>
      {/* 标签云 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Tag size={16} className="text-primary" />
          文章标签
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedTag('全部')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              selectedTag === '全部'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            全部文章
            <span className="ml-2 text-xs opacity-70">({posts.length})</span>
          </button>
          {tagStats.slice(0, 10).map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {tag}
              <span className="ml-2 text-xs opacity-70">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 时间轴 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          历史档案
        </h3>
        <div className="space-y-2">
          {postsByYear.map(([year, yearPosts]) => (
            <div key={year} className="text-sm">
              <div className="font-bold text-foreground mb-1">{year} 年</div>
              <div className="text-xs text-muted-foreground pl-4">{yearPosts.length} 篇文章</div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">博客统计</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <div className="text-xs text-muted-foreground">总文章数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{tagStats.length}</div>
            <div className="text-xs text-muted-foreground">标签数</div>
          </div>
        </div>
      </div>
    </>
  )

  const content = filteredPosts.length === 0 ? (
    <div className="p-12 text-center border rounded-xl bg-card/50 text-muted-foreground">
      {loading ? '加载中...' : '期待第一篇博文...'}
    </div>
  ) : (
    <div className="grid gap-6">
      {filteredPosts.map((post) => (
        <Link to={`/blog/${post.slug}`} key={post.slug} className="block group">
          <article className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
                {post.summary}
              </p>
              <div className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                阅读全文 <span>→</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )

  return (
    <ModuleLayout
      title="博客文章"
      description="记录技术探索与思考沉淀，分享开发实践与经验总结"
      icon={<FileText className="text-primary" />}
      sidebar={sidebar}
      isLoading={loading}
      gridCols="one"
    >
      {content}
    </ModuleLayout>
  )
}
