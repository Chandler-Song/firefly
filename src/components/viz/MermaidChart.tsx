import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
 
interface MermaidChartProps {
  code: string;
}

const MermaidChart: React.FC<MermaidChartProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 初始化mermaid
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit',
        fontSize: 14,
        flowchart: { useMaxWidth: true },
        themeCSS: '.node rect { fill: #ffffff; stroke: #333; } .edgePath path { stroke: #666; }'
      });

      // 渲染图表
      mermaid.mermaidAPI.render(
        `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, 
        code
      ).then(({svg}) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      }).catch((err) => {
        console.error('Mermaid render error:', err);
        setError(`图表渲染错误: ${err.message}`);
      });
    }
  }, [code]);

  if (error) {
    return (
      <div className="mermaid-error my-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
        <p className="text-destructive font-medium">{error}</p>
      </div>
    );
  }

  return <div ref={containerRef} className="my-1 overflow-auto" />;
};

export default MermaidChart;