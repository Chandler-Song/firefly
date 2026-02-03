---
title: G6 关系图与流程图示例
date: 2026-02-03
category: 图可视化
summary: 展示如何使用 AntV G6 渲染复杂的流程图、组织架构图和关系网络图。
---

### 1. 简单关系图示例

使用 `g6` 代码块声明节点和边的数据结构。

```g6
{
  "data": {
    "nodes": [
      { "id": "node1", "label": "核心应用", "x": 100, "y": 200 },
      { "id": "node2", "label": "G2 统计", "x": 300, "y": 100 },
      { "id": "node3", "label": "G6 关系", "x": 300, "y": 300 }
    ],
    "edges": [
      { "source": "node1", "target": "node2", "label": "依赖" },
      { "source": "node1", "target": "node3", "label": "依赖" }
    ]
  }
}
```

### 2. 力导向布局图

G6 支持强大的自动布局能力，例如力导向布局（Force Layout）。

```g6
{
  "data": {
    "nodes": [
      { "id": "0", "label": "中心节点" },
      { "id": "1", "label": "分支 A" },
      { "id": "2", "label": "分支 B" },
      { "id": "3", "label": "子项 C" },
      { "id": "4", "label": "子项 D" },
      { "id": "5", "label": "子项 E" }
    ],
    "edges": [
      { "source": "0", "target": "1" },
      { "source": "0", "target": "2" },
      { "source": "1", "target": "3" },
      { "source": "1", "target": "4" },
      { "source": "2", "target": "5" }
    ]
  },
  "layout": {
    "type": "force",
    "preventOverlap": true,
    "linkDistance": 100
  },
  "defaultNode": {
    "size": 40,
    "style": {
      "fill": "#bae7ff",
      "stroke": "#1890ff"
    }
  }
}
```
