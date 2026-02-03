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
    
    // 增强型解析：处理可能的跨行键值对
    const lines = yamlBlock.split('\n');
    let currentKey = '';
    let currentValue = '';

    lines.forEach(line => {
      const trimmedLine = line.trim();
      const colonIndex = line.indexOf(':');
      
      // 判断是否是新的 Key：存在冒号，且当前没有未闭合的 JSON 块
      const isNewKey = colonIndex !== -1 && 
                       !trimmedLine.startsWith('-') && 
                       !isInsideJson(currentValue);

      if (isNewKey) {
        if (currentKey) {
          processKeyValue(data, currentKey, currentValue);
        }
        currentKey = line.slice(0, colonIndex).trim();
        currentValue = line.slice(colonIndex + 1).trim();
      } else {
        currentValue += ' ' + trimmedLine;
      }
    });
    if (currentKey) {
      processKeyValue(data, currentKey, currentValue);
    }
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

function isInsideJson(value: string): boolean {
  const v = value.trim();
  if (v.startsWith('[') && !v.endsWith(']')) return true;
  if (v.startsWith('{') && !v.endsWith('}')) return true;
  // 简单的嵌套检查（可选增强）
  const openBrackets = (v.match(/\[/g) || []).length;
  const closeBrackets = (v.match(/\]/g) || []).length;
  const openBraces = (v.match(/\{/g) || []).length;
  const closeBraces = (v.match(/\}/g) || []).length;
  return openBrackets > closeBrackets || openBraces > closeBraces;
}

function processKeyValue(data: any, key: string, value: string) {
  value = value.trim().replace(/^["']|["']$/g, '');
  
  // 尝试解析 JSON 格式（支持跨行合并后的数组和对象）
  if ((value.startsWith('[') && value.endsWith(']')) || (value.startsWith('{') && value.endsWith('}'))) {
    try {
      data[key] = JSON.parse(value);
    } catch (e) {
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      } else {
        data[key] = value;
      }
    }
  } else {
    data[key] = value;
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
