import React, { useEffect, useRef } from 'react';
import { Infographic } from '@antv/infographic';

interface InfographicChartProps {
  config: string;
}

const InfographicChart: React.FC<InfographicChartProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<Infographic | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // 清除旧实例以支持 HMR 和重新渲染
      if (infoRef.current) {
        infoRef.current.destroy();
      }

      const infographic = new Infographic({
        container: containerRef.current,
        width: '100%',
        height: '100%',
      });

      // Infographic 接受 DSL 字符串或配置对象
      // 我们这里假设 config 是 DSL 字符串
      infographic.render(config);
      infoRef.current = infographic;

    } catch (error) {
      console.error('Infographic render error:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div class="text-destructive p-4">信息图表渲染错误: ${error}</div>`;
      }
    }

    return () => {
      if (infoRef.current) {
        infoRef.current.destroy();
        infoRef.current = null;
      }
    };
  }, [config]);

  return <div ref={containerRef} className="my-8 border rounded-xl bg-card shadow-sm overflow-hidden min-h-[400px]" />;
};

export default InfographicChart;
