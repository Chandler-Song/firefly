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
    
    ## 🎙️ 对话访谈模块指南 (Interviews Guide)
    
    项目包含一个功能强大的“对话访谈”模块，支持通过 Markdown 驱动自动生成嘉宾主页与访谈对话。
    
    ### 1. 快速创建访谈
    
    1.  **新建文件**：在 `src/content/interviews/` 目录下创建一个新的 `.md` 文件。
    2.  **命名规范**：遵循 `YYYY-MM-DD-受访者姓名-领域关键词.md` 格式。
        *   *示例*：`2026-02-04-sarah-chen-ai-agent-field.md`
    3.  **编写 Frontmatter**：这是驱动页面渲染的核心数据。
    
    ### 2. Frontmatter 字段详解
    
    | 字段 | 类型 | 说明 |
    | :--- | :--- | :--- |
    | `title` | String | 访谈文章标题 |
    | `date` | String | 发布日期 (用于排序，最新日期将显示在首页) |
    | `category` | String | 固定为 `"Interview"` |
    | `summary` | String | 访谈摘要，显示在列表页和首页模块 |
    | `guestName` | String | 嘉宾姓名 |
    | `guestTitle` | String | 嘉宾职衔 (如：首席科学家) |
    | `guestOrg` | String | 嘉宾所属机构 |
    | `guestAvatar` | URL | 嘉宾头像链接 |
    | `guestDescription` | String | 嘉宾背景详述 |
    | `guestAchievements` | Array | 嘉宾主要成就标签列表 |
    | `interviewRecords` | Array | **核心对话流**：包含 timestamp, question, answer 对象 |
    | `multimedia` | Array | **多媒体画廊**：包含 type, url, caption 对象 |
    
    ### 3. 配置示例模板
    
    ```markdown
    ---
    title: "访谈标题"
    date: "2026-02-04"
    category: "Interview"
    summary: "这里是访谈摘要..."
    guestName: "张三"
    guestTitle: "技术专家"
    guestOrg: "某某实验室"
    guestAvatar: "https://example.com/avatar.png"
    guestDescription: "详细背景介绍..."
    guestAchievements: ["成就1", "成就2"]
    interviewRecords: [
      {
        "timestamp": "10:00",
        "question": "这里是问题内容？",
        "answer": "这里是回答内容..."
      }
    ]
    multimedia: [
      {
        "type": "image",
        "url": "https://example.com/photo.jpg",
        "caption": "图片说明"
      }
    ]
    ---
    # 更多背景
    这里可以编写 Markdown 格式的访谈侧记或补充资料。
    ```
    
    ### 4. 高级配置说明
    
    #### 多媒体画廊 (Multimedia)
    *   **支持类型**：`image` (自动处理网格布局)、`video` (原生播放器)、`audio` (带动效的音频播放器)。
    *   **网格布局**：
        *   单张图片：在容器中优雅居中。
        *   多张图片：自动切换为响应式网格布局（桌面端双列，移动端单列），带悬停缩放效果。
    *   **容错处理**：若图片加载失败，系统会自动显示统一的占位占位图。
    
    #### 访谈对话流 (QA Stream)
    *   **引号自动剥离**：解析器会自动移除回答内容前后的多余引号，并使用现代化的引用图标装饰。
    *   **交互效果**：对话项在悬停时会触发左侧时间轴的动态高亮。
    
    ### 5. 主页显示逻辑
    *   **自动置顶**：首页模块会扫描 `src/content/interviews/` 下的所有文件，并自动提取 **日期最新** 的一个进行展示。
    *   **跳转逻辑**：点击首页访谈模块将直接进入该访谈的详情路由 `/interviews/[slug]`。
    
    ### 6. 技术实现与故障排查
    *   **解析机制**：由于 YAML 默认不支持复杂的嵌套 JSON 数组，项目重写了 `src/utils/markdown.ts` 解析引擎，支持跨行识别未闭合的 JSON 块。
    *   **TypeError: records.map is not a function**：
        *   **排查**：检查 Markdown 文件中 `interviewRecords` 的 JSON 格式是否正确（特别是引号和括号的闭合）。
        *   **解决**：确保 JSON 块前后没有多余的空行干扰解析逻辑。
    
    ---
    
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
    ### 6. 数据可视化系统集成
    **核心任务**：引入 AntV G2/G6/Infographic 提供全方位的可视化能力。
    - **组件开发**：
        - `G2Chart.tsx`: 基于 G2 5.x 封装的声明式统计图表组件。
        - `G6Graph.tsx`: 基于 G6 5.x 封装的关系图/树图组件，修复了 ESM 模块导出兼容性问题。
        - `InfographicChart.tsx`: 基于 Infographic 0.2.x 封装的信息图表组件，支持极简 DSL。
    - **渲染引擎**：在 `Detail.tsx` 中扩展 `react-markdown` 处理器，识别 `g2`、`g6` 和 `infographic` 代码块并动态渲染对应组件。
    - **示例库**：创建 `src/content/visualization/gallery.md` 和 `infographic-gallery.md`，提供 15+ 种场景配置。

## 📊 数据可视化指南 (Visualization Guide)

项目集成了 AntV G2 (统计图表)、G6 (关系图谱) 与 Infographic (信息图表) 库，支持在 Markdown/MDX 中通过代码块直接渲染交互式图表。

### 1. 快速上手

在任何 Markdown 文件中，使用 `g2`、`g6` 或 `infographic` 语言标识的代码块并编写配置：

#### Infographic 示例

```infographic
infographic list-row-simple-horizontal-arrow
data
  items
    - label: 步骤1
      desc: 描述1
```

+### 2. 图表分类索引
+
+详细示例请访问项目中的 [图表全集](src/content/visualization/gallery.md)。
+
| 分类 | 支持类型 |
| :--- | :--- |
| **G2 统计图表** | 折线图、柱状图、饼图/玫瑰图、散点气泡图、渐变面积图、甘特图 |
| **G6 关系图谱** | 组织架构图、关系网络图、桑基图、流程图、时间线图 |
| **Infographic** | 流程图、组织架构、思维导图、指标卡片、数据摘要 |

    ### 3. 配置参数说明
    
    #### G2 核心参数
    - `type`: 图表类型 (`line`, `interval`, `point`, `area` 等)
    - `data`: 数据源数组
    - `encode`: 字段映射 (`x`, `y`, `color`, `size`)
    - `coordinate`: 坐标系配置
    
    #### G6 核心参数
    - `data`: 节点 (`nodes`) 与 边 (`edges`) 数据
    - `layout`: 布局算法 (`force`, `dagre`, `compactBox`)
    - `behaviors`: 交互行为 (`drag-canvas`, `zoom-canvas`, `collapse-expand`)
    
    #### Infographic 核心参数
    - `DSL`: 极简的声明式文本描述数据与结构。
    
    ### 4. 常见问题 (FAQ)
    
    **Q: 为什么图表没有显示？**  
    A: 请检查代码块语言标识是否为 `g2`、`g6` 或 `infographic`；确保配置内容格式正确；检查浏览器控制台是否有语法错误。
    
    **Q: 如何调整图表高度？**  
    A: 默认高度由组件统一控制。若需个性化调整，可在对应组件中修改 `height` 配置。
    
    **Q: G6 导出错误 (Uncaught SyntaxError)?**  
    A: 项目采用 ESM 规范，必须使用 `import { Graph } from '@antv/g6'` 具名导入方式。
    


