/// <reference types="vite/client" />

export interface Post {
  slug: string
  title: string
  date: string
  tags?: string[]
  category?: string
  summary?: string
  content: string
  [key: string]: any
}

/**
 * 极简的 Frontmatter 解析器，避免使用依赖 Node.js Buffer 的库
 */
export function parseMarkdown(mdContent: string, slug: string): Post {
  const frontmatterRegex = /^---([\s\S]*?)---/;
  const match = mdContent.match(frontmatterRegex);
  
  let data: any = {};
  let content = mdContent;

  if (match) {
    const yamlBlock = match[1];
    content = mdContent.replace(frontmatterRegex, '').trim();
    
    // 简单的 YAML 键值对解析
    const lines = yamlBlock.split('\n');
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // 去除引号
        value = value.replace(/^["']|["']$/g, '');
        
        // 处理数组格式 [a, b]
        if (value.startsWith('[') && value.endsWith(']')) {
          data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        } else {
          data[key] = value;
        }
      }
    });
  }

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category || '',
    summary: data.summary || '',
    content,
    ...data
  }
}

// 批量获取指定模块的内容
export async function getModuleContent(moduleName: string): Promise<Post[]> {
  try {
    // 使用相对路径模式以提高 Vite 兼容性
    const modules = import.meta.glob('../content/**/*.md', { query: '?raw', eager: true, import: 'default' })
    const posts: Post[] = []
    // 移除路径匹配中的多余斜杠，增强兼容性
    const searchPattern = `content/${moduleName}/`

    for (const path in modules) {
      if (path.includes(searchPattern)) {
        const slug = path.split('/').pop()?.replace('.md', '') || ''
        const content = modules[path] as string
        if (content) {
          posts.push(parseMarkdown(content, slug))
        }
      }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`加载 ${moduleName} 模块内容失败:`, error)
    return []
  }
}

export async function getPostBySlug(moduleName: string, slug: string): Promise<Post | null> {
  const all = await getModuleContent(moduleName)
  return all.find(p => p.slug === slug) || null
}
