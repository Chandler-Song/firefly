---
title: 图表可视化全集
date: 2026-02-01
category: Visualization
summary: 包含 G2 统计图表与 G6 关系图谱的多种经典示例，涵盖折线图、柱状图、组织架构图、关系网络等。
---

# AntV 可视化图表库示例指南

本项目集成了 AntV G2 和 G6 两个强大的可视化库。本页面展示了多种图表类型的实现方式及其配置规范。

## 一、G2 统计图表 (Statistics)

G2 是一套基于图形语法的可视化语法，适用于各种统计类图表。

### 1.1 折线图 (Line Chart)
展示数据随时间或有序类别的变化趋势，带标记点。

```g2
{
  "type": "view",
  "children": [
    {
      "type": "line",
      "data": [
        {"month": "Jan", "value": 30}, {"month": "Feb", "value": 45},
        {"month": "Mar", "value": 35}, {"month": "Apr", "value": 60},
        {"month": "May", "value": 55}, {"month": "Jun", "value": 80}
      ],
      "encode": { "x": "month", "y": "value" },
      "style": { "lineWidth": 2, "stroke": "#1890ff" },
      "animate": { "enter": { "type": "fadeIn" } }
    },
    {
      "type": "point",
      "data": [
        {"month": "Jan", "value": 30}, {"month": "Feb", "value": 45},
        {"month": "Mar", "value": 35}, {"month": "Apr", "value": 60},
        {"month": "May", "value": 55}, {"month": "Jun", "value": 80}
      ],
      "encode": { "x": "month", "y": "value" },
      "style": { "fill": "white", "stroke": "#1890ff", "lineWidth": 2 },
      "tooltip": false
    }
  ]
}
```

### 1.2 柱状图 (Bar Chart)
分组与堆叠柱状图示例。

```g2
{
  "type": "interval",
  "data": [
    { "category": "London", "month": "Jan.", "value": 18.9 },
    { "category": "London", "month": "Feb.", "value": 28.8 },
    { "category": "Berlin", "month": "Jan.", "value": 12.4 },
    { "category": "Berlin", "month": "Feb.", "value": 23.2 }
  ],
  "encode": { "x": "month", "y": "value", "color": "category" },
  "transform": [{ "type": "dodgeX" }],
  "labels": [{ "text": "value", "position": "top" }]
}
```

### 1.3 饼图 (Pie/Rose Chart)
南丁格尔玫瑰图展示。

```g2
{
  "type": "interval",
  "data": [
    { "item": "分类 1", "count": 40 },
    { "item": "分类 2", "count": 30 },
    { "item": "分类 3", "count": 20 },
    { "item": "分类 4", "count": 10 }
  ],
  "encode": { "y": "count", "color": "item" },
  "coordinate": { "type": "polar", "innerRadius": 0.2 },
  "transform": [{ "type": "stackY" }],
  "style": { "stroke": "#fff", "inset": 1, "radius": 4 },
  "labels": [{ "text": "item", "position": "outside" }]
}
```

### 1.4 散点气泡图 (Scatter/Bubble Chart)
带有回归趋势分析的散点图。

```g2
{
  "type": "view",
  "children": [
    {
      "type": "point",
      "data": [
        {"x": 10, "y": 20, "size": 30}, {"x": 40, "y": 50, "size": 60},
        {"x": 80, "y": 30, "size": 40}, {"x": 20, "y": 70, "size": 20},
        {"x": 60, "y": 90, "size": 80}, {"x": 50, "y": 40, "size": 50}
      ],
      "encode": { "x": "x", "y": "y", "size": "size", "color": "size" },
      "style": { "fillOpacity": 0.6, "stroke": "#fff" }
    }
  ]
}
```

### 1.5 渐变面积图 (Area Chart)
渐变填充效果的多层面积图。

```g2
{
  "type": "area",
  "data": [
    { "year": "2010", "value": 100 }, { "year": "2011", "value": 120 },
    { "year": "2012", "value": 160 }, { "year": "2013", "value": 140 },
    { "year": "2014", "value": 200 }, { "year": "2015", "value": 180 }
  ],
  "encode": { "x": "year", "y": "value" },
  "style": {
    "fill": "linear-gradient(to bottom, #1890ff, #ffffff)",
    "fillOpacity": 0.8
  }
}
```

## 二、G6 关系图谱 (Graphs)

G6 专注于图分析与图可视化，适用于复杂关系建模。

### 2.1 组织架构图 (Org Chart)
支持层级展开与折叠。

```g6
{
  "data": {
    "id": "root",
    "label": "董事长",
    "children": [
      { "id": "hr", "label": "人力资源部" },
      { 
        "id": "tech", "label": "技术中心", 
        "children": [
          { "id": "dev", "label": "研发部" },
          { "id": "qa", "label": "测试部" }
        ]
      },
      { "id": "sales", "label": "销售中心" }
    ]
  },
  "layout": { "type": "compactBox", "direction": "TB", "getHeight": 40, "getWidth": 120, "getVGap": 40, "getHGap": 20 },
  "defaultNode": { "type": "rect", "size": [120, 40], "style": { "fill": "#e6f7ff", "stroke": "#91d5ff", "radius": 4 } },
  "defaultEdge": { "type": "polyline", "style": { "stroke": "#91d5ff" } },
  "behaviors": ["drag-canvas", "zoom-canvas", "collapse-expand"]
}
```

### 2.2 关系网络图 (Force Graph)
力导向布局，展示节点聚类。

```g6
{
  "data": {
    "nodes": [
      { "id": "node1", "label": "核心", "style": { "fill": "#f5222d" } },
      { "id": "node2", "label": "节点A" }, { "id": "node3", "label": "节点B" },
      { "id": "node4", "label": "节点C" }, { "id": "node5", "label": "节点D" }
    ],
    "edges": [
      { "source": "node1", "target": "node2" }, { "source": "node1", "target": "node3" },
      { "source": "node1", "target": "node4" }, { "source": "node1", "target": "node5" },
      { "source": "node2", "target": "node3" }
    ]
  },
  "layout": { "type": "force", "preventOverlap": true, "linkDistance": 100 },
  "behaviors": ["drag-node", "drag-canvas", "zoom-canvas"]
}
```

### 2.3 桑基图 (Sankey Diagram)
流量流向可视化。

```g6
{
  "data": {
    "nodes": [
      { "id": "a", "label": "来源A" }, { "id": "b", "label": "来源B" },
      { "id": "c", "label": "中间节点" },
      { "id": "d", "label": "目标X" }, { "id": "e", "label": "目标Y" }
    ],
    "edges": [
      { "source": "a", "target": "c", "value": 10 },
      { "source": "b", "target": "c", "value": 5 },
      { "source": "c", "target": "d", "value": 8 },
      { "source": "c", "target": "e", "value": 7 }
    ]
  },
  "layout": { "type": "dagre", "rankdir": "LR" },
  "defaultEdge": { "type": "cubic-horizontal", "style": { "stroke": "#ccc", "lineWidth": 2 } }
}
```

### 2.4 流程图 (Flowchart)
节点连接与可编辑状态。

```g6
{
  "data": {
    "nodes": [
      { "id": "start", "label": "开始", "type": "circle", "size": 50 },
      { "id": "process", "label": "处理中", "type": "rect" },
      { "id": "end", "label": "结束", "type": "circle", "size": 50 }
    ],
    "edges": [
      { "source": "start", "target": "process", "label": "触发" },
      { "source": "process", "target": "end", "label": "完成" }
    ]
  },
  "layout": { "type": "dagre", "rankdir": "LR" },
  "behaviors": ["drag-node", "click-select"]
}
```

### 2.5 时间线图 (Timeline)
水平或垂直时间轴展示。

```g6
{
  "data": {
    "nodes": [
      { "id": "2021", "label": "2021 启动", "x": 100, "y": 100 },
      { "id": "2022", "label": "2022 扩张", "x": 300, "y": 100 },
      { "id": "2023", "label": "2023 领先", "x": 500, "y": 100 }
    ],
    "edges": [
      { "source": "2021", "target": "2022" },
      { "source": "2022", "target": "2023" }
    ]
  },
  "defaultEdge": { "type": "line", "style": { "endArrow": true } }
}
```

### 1.6 甘特图 (Gantt Chart)
项目进度管理可视化。

```g2
{
  "type": "interval",
  "data": [
    { "task": "需求分析", "start": "2026-01-01", "end": "2026-01-05" },
    { "task": "架构设计", "start": "2026-01-06", "end": "2026-01-10" },
    { "task": "核心开发", "start": "2026-01-11", "end": "2026-01-30" },
    { "task": "测试验收", "start": "2026-02-01", "end": "2026-02-10" }
  ],
  "encode": {
    "x": "task",
    "y": ["start", "end"],
    "color": "task"
  },
  "coordinate": { "transform": [{ "type": "transpose" }] },
  "labels": [{ "text": "task", "position": "inside" }]
}
```

### 2.6 甘特图 (Gantt Graph)
使用关系图模拟项目排期。

```g6
{
  "data": {
    "nodes": [
      { "id": "p1", "label": "需求阶段", "x": 150, "y": 50, "size": [200, 30], "type": "rect" },
      { "id": "p2", "label": "开发阶段", "x": 350, "y": 100, "size": [300, 30], "type": "rect" },
      { "id": "p3", "label": "测试阶段", "x": 550, "y": 150, "size": [150, 30], "type": "rect" }
    ],
    "edges": [
      { "source": "p1", "target": "p2", "type": "polyline" },
      { "source": "p2", "target": "p3", "type": "polyline" }
    ]
  },
  "defaultNode": { "style": { "fill": "#f0f5ff", "stroke": "#adc6ff" } }
}
```

---

## 三、配置参数说明

### G2 配置规范
- `type`: 定义图表类型（view, interval, line, point, area 等）。
- `data`: 数组格式的数据源。
- `encode`: 映射字段到图形属性（x, y, color, size 等）。
- `coordinate`: 坐标系设置（polar, theta, transpose 等）。

### G6 配置规范
- `data`: 包含 `nodes` 和 `edges` 的对象（树图使用嵌套 `children`）。
- `layout`: 布局算法（force, dagre, circular, compactBox 等）。
- `behaviors`: 交互行为（drag-canvas, zoom-canvas, drag-node 等）。
- `defaultNode/defaultEdge`: 默认样式配置。
