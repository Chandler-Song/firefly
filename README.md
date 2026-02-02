# Firefly - 个人职业形象门户 (Personal Portfolio)

Firefly 是一个基于 **React 18 + TypeScript + Vite** 构建的高性能个人职业形象门户。它旨在帮助专业人士构建模块化的知识中枢，系统化展示专业价值与思想深度。

## 🚀 项目架构

项目采用模块化设计，数据与 UI 分离，支持 Markdown/MDX 内容驱动。

```text
.
├── .github/workflows/   # CI/CD 自动化部署配置
├── public/              # 静态资源 (包含 .nojekyll 确保资源加载)
├── src/
│   ├── assets/          # 本地图片、字体等资源
│   ├── components/      # 通用 UI 原子组件
│   ├── content/         # Markdown 内容源 (博客、知识分享)
│   ├── data/            # 结构化 JSON 数据 (简历、工具、社交链接)
│   ├── layouts/         # 页面容器布局
│   ├── pages/           # 核心功能页面 (Resume, Blog, Social 等)
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数 (Markdown 解析等)
│   ├── App.tsx          # 路由配置中心
│   └── main.tsx         # 项目入口
├── tailwind.config.js   # Tailwind CSS 样式配置
├── vite.config.ts       # Vite 构建与部署配置
└── package.json         # 依赖管理与脚本
```

## 🛠 快速上手

### 1. 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 构建与部署
项目已配置 GitHub Actions，只需推送代码到 `main` 分支即可自动部署。

```bash
git add .
git commit -m "feat: your message"
git push origin main
```

## ⚠️ 常见错误与解决方案 (Troubleshooting)

在项目搭建和部署过程中，你可能会遇到以下典型问题：

### 1. GitHub 推送权限问题
*   **错误信息**: `remote: Invalid username or token. Password authentication is not supported.`
*   **原因**: GitHub 禁用了密码认证。
*   **解决**: 使用 **Personal Access Token (PAT)**。确保生成的 Token 勾选了 `repo` 和 `workflow` (修改 Action 脚本需要) 权限。

### 2. 部署后页面空白 (路由问题)
*   **错误信息**: 访问 `https://<user>.github.io/firefly/` 却不显示内容。
*   **解决**: 
    1.  在 `vite.config.ts` 中设置 `base: '/firefly/'` (或 `./`)。
    2.  在 `App.tsx` 中为 `BrowserRouter` 设置 `basename="/firefly"`。

### 3. 部署后 JS/CSS 404 错误 (Jekyll 干扰)
*   **错误信息**: `Failed to load resource: the server responded with a status of 404`。
*   **原因**: GitHub Pages 默认使用的 Jekyll 引擎会忽略下划线 `_` 开头的文件。
*   **解决**: 在 `public/` 目录下创建一个空的 **`.nojekyll`** 文件，禁用 Jekyll 引擎。

### 4. 导入路径带后缀错误
*   **错误信息**: `An import path can only end with a '.tsx' extension when 'allowImportingTsExtensions' is enabled.`
*   **解决**: 在 TypeScript 项目中，`import` 本地组件时**不要**写 `.tsx` 后缀。例如：使用 `import App from './App'` 而不是 `import App from './App.tsx'`。

## 📌 注意事项

1.  **部署分支**: 请确保在 GitHub 仓库的 `Settings -> Pages` 中，`Source` 选择 `Deploy from a branch`，且分支设置为 **`gh-pages`**。
2.  **数据更新**: 若要修改简历或链接，只需编辑 `src/data/*.json` 文件，无需修改组件代码。
3.  **CI/CD 权限**: 在 `Settings -> Actions -> General` 中，确保 **Workflow permissions** 设置为 `Read and write permissions`。

## 🌟 核心功能
- [x] **个人简历**: 结构化展示教育与工作经历。
- [x] **社交聚合**: 聚合 GitHub、LinkedIn 等专业平台。
- [x] **内容引擎**: 支持通过 Markdown 发布博客与知识分享。
- [x] **响应式设计**: 完美适配移动端与暗黑模式。

## 📝 内容管理指南 (CRUD 教程)

本节将详细介绍如何管理项目中的六个核心模块：**知识 (Knowledge)、博客 (Blog)、洞察 (Insights)、工具 (Tools)、笔记 (Notes)、成就 (Achievements)**。

### 1. 新增内容 (Create)

为模块添加新条目，请遵循以下步骤：

1.  **确定目录**：根据模块类型，进入对应的 `src/content/` 子目录：
    *   `src/content/knowledge/`
    *   `src/content/blog/`
    *   `src/content/insights/`
    *   `src/content/tools/`
    *   `src/content/notes/`
    *   `src/content/achievements/`
2.  **创建文件**：新建一个以 `.md` 结尾的 Markdown 文件。
    *   **命名规则**：建议使用小写字母和连字符（kebab-case），例如 `my-new-post.md`。文件名将作为访问该条目的 `slug`（即 URL 的一部分）。
3.  **编写 Frontmatter 元数据**：在文件最顶部添加 YAML 格式的配置信息。
    ```markdown
    ---
    title: "文章标题"
    date: "2026-02-02"
    category: "技术分类"
    summary: "这是内容摘要，将显示在列表页。"
    tags: ["标签1", "标签2"]
    ---
    ```
4.  **编写正文**：在第二个 `---` 之后开始编写 Markdown 内容。

### 2. 删除内容 (Delete)

1.  **物理删除**：直接删除 `src/content/[module]/` 目录下对应的 `.md` 文件即可。
2.  **自动生效**：由于系统采用动态加载机制，删除文件后，列表页和详情页将自动不再显示该条目，无需手动清理其他引用。

### 3. 修改内容 (Update)

1.  **编辑文件**：打开对应的 `.md` 文件。
2.  **更新字段**：您可以随时修改 Frontmatter 中的 `title`、`date`、`summary` 等。
3.  **保存验证**：
    *   **开发环境**：保存后浏览器会通过 HMR 自动热更新。
    *   **生产环境**：提交代码并推送至 GitHub，Action 自动部署后生效。

### 4. 查询与检索 (Read)

1.  **列表页访问**：通过导航栏或 URL 直接访问模块主页，例如 `/blog`。
2.  **详情页定位**：点击列表项，系统会根据文件名生成路由跳转，格式为 `/[module]/[filename-without-ext]`。例如访问 `blog/my-post.md` 的 URL 为 `/blog/my-post`。

### 5. 技术实现说明

*   **动态加载 (`import.meta.glob`)**：在 `src/utils/markdown.ts` 中，我们使用了 Vite 提供的批量导入功能，它会在构建时自动扫描 `src/content/` 目录下的所有文件，避免了手动维护文件索引。
*   **前端解析**：为了兼容浏览器环境，我们避开了 Node.js 特有的 `Buffer` 对象，采用正则表达式手动解析 Frontmatter YAML 块。
*   **路由配置**：在 `src/App.tsx` 中使用了 React Router 的动态参数路由 `path="/[module]/:slug"`，通过 `useParams` 获取文件名并加载内容。

### 6. 常见问题排查 (Troubleshooting)

*   **"Buffer is not defined"**：
    *   **原因**：使用了依赖 Node.js 内置模块的 `gray-matter`。
    *   **解决**：本项目已在 `src/utils/markdown.ts` 中切换为纯前端正则解析方案，从源头上规避了此报错。
*   **页面显示“加载中...”且不更新**：
    *   **排查**：检查 `src/utils/markdown.ts` 中的 `import.meta.glob` 路径；确保 Markdown 文件头部格式正确。
*   **图片无法显示**：
    *   **解决**：相对路径引用的图片在子路径部署时易失效。建议将图片存放在 `public/assets/` 并使用绝对路径访问。
    
    ## 📜 开发过程记录 (Development History)
    
    ### 1. 基础环境配置与路由优化
    **核心任务**：解决 GitHub Pages 部署下的子路径访问问题。
    - **分析**：检查 `src/main.tsx` 和 `src/App.tsx`，确认硬编码的 `basename` 导致开发环境空白。
    - **动作**：通过调研修改配置，引入 `import.meta.env.DEV` 进行动态环境判断，确保本地开发与生产环境配置隔离。
    
    ### 2. 六大核心模块架构开发
    **核心任务**：建立知识、博客、洞察、工具、笔记、成就的详情展示系统。
    - **文件结构**：
        - 创建 `src/content/` 各模块子目录及示例 Markdown 文档。
        - 创建 `src/pages/Detail.tsx` 通用详情组件，集成 `react-markdown` 和 `remark-gfm`。
    - **自动化加载**：升级 `src/utils/markdown.ts`，利用 Vite 的 `import.meta.glob` 实现内容自动扫描与热加载，降低维护成本。
    
    ### 3. 兼容性与运行时修复
    **核心任务**：修复控制台 `Buffer is not defined` 报错及数据加载卡死问题。
    - **报错排查**：确认 `gray-matter` 依赖 Node.js 模块，在浏览器端运行抛出 ReferenceError。
    - **解决方案**：彻底移除 `gray-matter`，在 `markdown.ts` 中手动实现轻量级正则解析器提取 Frontmatter。同时修正了 `import.meta.glob` 的相对路径匹配逻辑，解决数据无法读取的问题。
    - **稳定性提升**：在各模块页面增加异步捕获与状态恢复逻辑，确保 UI 加载反馈准确。
    
    ### 4. 个性化定制与内容填充
    **核心任务**：协助用户完成站点定制化并录入真实荣誉数据。
    - **荣誉文档**：在 `src/content/achievements/` 录入职场（最佳猎手、Top Biller）与学术（奖学金、优秀毕业生）高质量 Markdown 内容。
    - **定制指引**：
        - **Logo/文本**：修改 `src/layouts/Layout.tsx` 将 "Portal." 更改为个人品牌 "Chandler"。
        - **SEO/标题**：优化 `index.html` 中的 Title 与 Meta Description。
        - **个人简介**：更新 `src/pages/Home.tsx` 中的 Hero 核心文案。
        - **主题色彩**：调整 `src/index.css` 中的 HSL 变量以切换视觉风格。
    
    ### 5. 文档沉淀与管理指南
    **核心任务**：建立标准化的内容运维体系。
    - **成果**：编写了详细的 CRUD 教程，涵盖新增、删除、修改、查询内容的标准流程与技术细节，确保项目的长期可维护性。
    


