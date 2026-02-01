# 个人职业形象门户需求文档 (V1.0 完整版)

## 1. 项目定位
构建**模块化个人知识中枢**与**职业品牌阵地**。通过 React + TypeScript + Vite 打造高性能静态门户，实现职业经历、深度思考与技术沉淀的标准化输出。

## 2. 核心模块定义
| 模块 | 功能描述 | MVP 优先级 | 数据结构 |
|------|----------|------------|----------|
| **1. 个人简历** | 教育背景、工作经历、技能清单 | P0 (核心) | `resume.json` |
| **2. 社交聚合** | 各大平台链接(GitHub, LinkedIn等) | P0 (核心) | `social.json` |
| **3. 知识分享** | 短内容/碎片化经验总结 | P1 (重要) | `/content/knowledge/*.md` |
| **4. 博客文章** | 深度长文(含代码高亮、目录) | P0 (核心) | `/content/blog/*.mdx` |
| **5. 行业洞察** | 趋势分析/季度报告/可视化图表 | P2 (扩展) | `/data/insights.json` |
| **6. 工具资源库** | 个人开源项目/推荐工具集 | P1 (重要) | GitHub API + `tools.json` |
| **7. 读书笔记** | 书籍精华、评分与实践心得 | P2 (扩展) | `/content/books/*.md` |
| **8. 荣誉成就** | 证书、奖项、权威认证时间轴 | P1 (重要) | `achievements.json` |

## 3. 用户故事 (User Stories)
- **访客(招聘者)**：我希望能在 10 秒内看到该候选人的核心技能和工作经历，并能一键下载 PDF 版简历。
- **访客(同行)**：我希望能通过标签筛选博客，并方便地跳转到作者的 GitHub 查看工具源码。
- **作者(本人)**：我希望只需提交一个 Markdown 文件到 GitHub，网站就能自动通过 CI/CD 完成更新。

## 4. 技术架构方案
### 4.1 技术栈选型
- **核心框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式方案**: Tailwind CSS (原子化 CSS，便于快速构建专业 UI)
- **UI 组件库**: Shadcn/ui (基于 Radix UI)
- **内容处理**: Gray-matter (解析 MD 前置元数据) + Lucide React (图标)
- **静态生成**: Vite-plugin-ssg 或静态路由导出

### 4.2 项目目录结构
```bash
src/
├── assets/             # 静态资源 (图片、PDF 简历)
├── components/         # 复用组件 (Card, Navbar, Footer)
├── content/            # 内容源 (Markdown 文件)
│   ├── blog/
│   └── knowledge/
├── data/               # 结构化数据 (JSON)
│   ├── resume.json
│   └── social.json
├── hooks/              # 自定义 Hooks (useSearch, useTheme)
├── layouts/            # 页面布局模板
├── pages/              # 页面组件
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数 (MD 解析器、日期格式化)
```

## 5. 可扩展性与接口设计
### 5.1 数据模型设计 (Base Interface)
```typescript
interface BaseContent {
  id: string;
  title: string;
  publishDate: string;
  tags?: string[];
  summary?: string;
}

// 简历专有结构
interface ResumeData {
  education: Array<{ school: string; degree: string; period: string }>;
  experience: Array<{ company: string; role: string; achievements: string[] }>;
  skills: Record<string, string[]>; // e.g., { "Frontend": ["React", "TS"] }
}
```

## 6. 部署方案 (GitHub Pages)
1. **CI/CD 流水线**: 使用 GitHub Actions。
2. **流程**:
   - `main` 分支提交代码。
   - 触发 Action：安装依赖 -> 执行 `npm run build`。
   - 将生成的 `dist` 目录推送到 `gh-pages` 分支。
3. **SEO**: 自动生成 `sitemap.xml`，配置 `robots.txt`。

## 7. 非功能需求
- **性能**: Lighthouse 性能评分 > 90 分。
- **兼容性**: 完美适配移动端与暗黑模式。
- **安全**: 无后端交互，静态托管，天然抵御注入攻击。
