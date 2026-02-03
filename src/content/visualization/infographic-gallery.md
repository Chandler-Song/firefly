---
title: 信息图表可视化库 (@antv/infographic)
date: 2026-02-01
category: Visualization
summary: 展示使用 @antv/infographic 声明式引擎创建的 5 种不同类型的信息图表。
---

# AntV Infographic 信息图表库示例

本项目集成了 `@antv/infographic`，它提供了一套极简的声明式 DSL，用于快速构建具有视觉冲击力的信息图表。

## 1. 流程图 (Flowchart)
展示简单的横向流程步骤。

```infographic
infographic list-row-simple-horizontal-arrow
data
  items
    - label: 需求分析
      desc: 明确项目目标与范围
    - label: 架构设计
      desc: 确定技术栈与系统结构
    - label: 核心开发
      desc: 实现业务逻辑与功能
    - label: 测试验收
      desc: 确保质量符合预期
```

## 2. 组织架构图 (Org Chart)
展示层级关系。

```infographic
infographic tree-org-simple
data
  id: CEO
  label: 首席执行官
  children:
    - id: CTO
      label: 首席技术官
      children:
        - id: DEV
          label: 研发部
        - id: QA
          label: 测试部
    - id: CMO
      label: 首席营销官
```

## 3. 思维导图 (Mind Map)
展示发散性思维。

```infographic
infographic tree-mindmap-simple
data
  id: root
  label: 核心主题
  children:
    - id: sub1
      label: 子主题 A
    - id: sub2
      label: 子主题 B
    - id: sub3
      label: 子主题 C
```

## 4. 仪表板卡片 (Dashboard Card)
展示核心指标。

```infographic
infographic card-simple-indicator
data
  title: 本月活跃用户
  value: 85.2
  unit: %
  status: up
  trend: 12.5%
```

## 5. 数据可视化卡片 (Data Viz Card)
组合文本与图表。

```infographic
infographic card-chart-summary
data
  title: 年度收入增长
  value: 1.2M
  chartType: area
  items:
    - label: 2023
      value: 800
    - label: 2024
      value: 1000
    - label: 2025
      value: 1200
```

---

## 配置说明

- **DSL 格式**：使用极简的缩进或 YAML 风格描述数据。
- **模板选择**：通过第一行 `infographic <template-name>` 指定图表模板。
- **数据绑定**：在 `data` 关键字下定义结构化数据。
