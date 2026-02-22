import { useState, useEffect, useRef } from 'react';
import { renderMermaid } from 'beautiful-mermaid';

interface MermaidDiagramProps {
  source: string;
  className?: string;
}

export default function MermaidDiagram({ source, className = '' }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderMermaid(source, {
      bg: '#1f2937',
      fg: '#d1d5db',
      accent: '#a78bfa',
      surface: '#374151',
      border: '#6b7280',
      line: '#9ca3af',
      muted: '#e5e7eb',
      padding: 24,
      nodeSpacing: 16,
      layerSpacing: 32,
    }).then((result) => {
      // Strip fixed width/height from SVG so it scales to container
      const scaled = result
        .replace(/\bwidth="[^"]*"/, '')
        .replace(/\bheight="[^"]*"/, '');
      setSvg(scaled);
    });
  }, [source]);

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram rounded-lg overflow-hidden bg-[#1f2937] p-4 ${className}`}
      style={{ width: '100%' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
