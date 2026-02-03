import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, Post } from '../utils/markdown'
import { ArrowLeft, Calendar } from 'lucide-react'
import G2Chart from '../components/viz/G2Chart'
import G6Graph from '../components/viz/G6Graph'
import InfographicChart from '../components/viz/InfographicChart'
import Interview from '../components/Interview'

interface DetailProps {
  module: string
}

export default function Detail({ module }: DetailProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getPostBySlug(module, slug)
        .then(res => {
          setData(res)
        })
        .catch(err => {
          console.error('获取文章详情失败:', err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [module, slug])

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center animate-pulse">加载中...</div>
  if (!data) return <div className="max-w-4xl mx-auto py-20 text-center text-muted-foreground">内容暂未找到</div>

  if (module === 'interviews') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-10 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 返回列表
        </button>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Interview 
            guest={{
              name: data.guestName,
              title: data.guestTitle,
              organization: data.guestOrg,
              avatar: data.guestAvatar,
              description: data.guestDescription,
              achievements: data.guestAchievements || []
            }}
            records={data.interviewRecords || []}
            multimedia={data.multimedia || []}
          />
          
          {data.content && (
            <div className="mt-16 pt-16 border-t">
              <h3 className="text-2xl font-bold mb-8">更多背景</h3>
              <div className="markdown-content prose prose-neutral dark:prose-invert max-w-none text-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {data.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-10 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 返回列表
      </button>

      <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm font-medium text-primary mb-4">
            {data.category && (
              <span className="px-2 py-1 rounded bg-primary/10 uppercase tracking-wider">
                {data.category}
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar size={14} /> {data.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {data.title}
          </h1>
          {data.summary && (
            <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
              {data.summary}
            </p>
          )}
        </header>

        <div className="markdown-content prose prose-neutral dark:prose-invert max-w-none 
          whitespace-pre-wrap leading-relaxed text-lg text-foreground/90">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props
                const matchG2 = /language-g2/.exec(className || '')
                const matchG6 = /language-g6/.exec(className || '')
                const matchInfo = /language-infographic/.exec(className || '')
                
                if (matchG2) {
                  return <G2Chart config={String(children).replace(/\n$/, '')} />
                }
                
                if (matchG6) {
                  return <G6Graph config={String(children).replace(/\n$/, '')} />
                }

                if (matchInfo) {
                  return <InfographicChart config={String(children).replace(/\n$/, '')} />
                }
                
                return (
                  <code className={className} {...rest}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
