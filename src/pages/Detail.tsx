import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import { getPostBySlug, Post } from '../utils/markdown'
import { ArrowLeft, Calendar } from 'lucide-react'
import G2Chart from '../components/viz/G2Chart'
import G6Graph from '../components/viz/G6Graph'
import InfographicChart from '../components/viz/InfographicChart'
import MermaidChart from '../components/viz/MermaidChart'
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
      <div className="max-w-6xl mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors group"
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
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xl font-bold mb-4">更多背景</h3>
              <div className="markdown-content prose prose-neutral prose-sm dark:prose-invert max-w-none">
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
    <div className="max-w-4xl mx-auto px-4 py-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 返回列表
      </button>

      <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
            {data.category && (
              <span className="px-2 py-0.5 rounded bg-primary/10 uppercase tracking-wider text-xs">
                {data.category}
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Calendar size={12} /> {data.date}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-snug">
            {data.title}
          </h1>
          {data.summary && (
            <p className="text-base text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4 py-1">
              {data.summary}
            </p>
          )}
        </header>

        <div className="markdown-content prose prose-neutral dark:prose-invert max-w-none 
          leading-relaxed text-base text-foreground/90
          prose-headings:my-0 prose-p:my-0 prose-table:my-0 prose-ul:my-0 prose-ol:my-0 prose-blockquote:my-0
          [&>*]:whitespace-normal">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{

              // 自定义标题渲染以增强视觉层次
              h1: ({node, ...props}) => (
                <h1 className="!text-xl !font-bold !mt-6 !mb-3 text-foreground border-b border-border pb-1" {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 className="!text-lg !font-bold !mt-5 !mb-2 text-foreground/90" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="!text-base !font-semibold !mt-4 !mb-1.5 text-foreground/80" {...props} />
              ),
              h4: ({node, ...props}) => (
                <h4 className="!text-sm !font-medium !mt-3 !mb-1 text-foreground/70" {...props} />
              ),
              h5: ({node, ...props}) => (
                <h5 className="!text-sm !font-medium !mt-2.5 !mb-1 text-foreground/60" {...props} />
              ),
              h6: ({node, ...props}) => (
                <h6 className="!text-sm !font-normal !mt-2 !mb-1 text-foreground/50" {...props} />
              ),
              // 自定义代码块渲染
              code({node, ...props}) {
                const { children, className } = props
                const matchG2 = /language-g2/.exec(className || '')
                const matchG6 = /language-g6/.exec(className || '')
                const matchInfo = /language-infographic/.exec(className || '')
                const matchMermaid = /language-mermaid|mermaid/.exec(className || '')
                const matchDiff = /language-diff|diff/.exec(className || '')
                
                if (matchG2) {
                  return <G2Chart config={String(children).replace(/\n$/, '')} />
                }
                
                if (matchG6) {
                  return <G6Graph config={String(children).replace(/\n$/, '')} />
                }

                if (matchInfo) {
                  return <InfographicChart config={String(children).replace(/\n$/, '')} />
                }
                
                if (matchMermaid) {
                  return <MermaidChart code={String(children)} />
                }
                
                // 为diff代码块添加特殊样式
                if (matchDiff) {
                  return (
                    <div className="diff-code-block my-2 rounded-sm overflow-x-auto">
                      <pre className="block p-2 overflow-x-auto text-xs rounded-sm bg-muted">
                        <code>
                          {String(children).split('\n').map((line, i) => {
                            const isAddition = line.startsWith('+') && !line.startsWith('+++');
                            const isDeletion = line.startsWith('-') && !line.startsWith('---');
                            
                            return (
                              <div 
                                key={i} 
                                className={`whitespace-pre ${isAddition ? 'bg-green-500/10' : ''} ${isDeletion ? 'bg-red-500/10' : ''}`}
                              >
                                {line}
                              </div>
                            );
                          })}
                        </code>
                      </pre>
                    </div>
                  );
                }
                
                return (
                  <code className={className}>
                    {children}
                  </code>
                )
              },
              // 自定义块引用样式
              blockquote: ({node, ...props}) => (
                <blockquote className="!border-l-4 border-primary !pl-4 !py-2 !my-4 bg-muted/10 rounded-r-sm !text-sm italic" {...props} />
              ),
              // 自定义表格样式
              table: ({node, ...props}) => (
                <div className="overflow-x-auto !mt-2 !mb-4">
                  <table className="border-collapse border border-border min-w-full text-sm" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th className="border border-border px-3 py-2 bg-muted font-semibold text-left text-sm" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border border-border px-3 py-2 text-sm" {...props} />
              ),
              // 自定义段落间距
              p: ({node, ...props}) => (
                <p className="!my-3 !text-base leading-relaxed" {...props} />
              ),
              // 自定义列表间距
              ul: ({node, ...props}) => (
                <ul className="!my-3 space-y-1 pl-5" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="!my-3 space-y-1 pl-5" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="!my-1" {...props} />
              ),
              hr: ({node, ...props}) => (
                <hr className="!my-6 border-border" {...props} />
              )
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
