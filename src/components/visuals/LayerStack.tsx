/** Isometric stack of infrastructure layers for the About section (light theme). */
const layers = ["Automation", "Identity / Access", "Network", "Infrastructure"];

export function LayerStack({ className }: { className?: string }) {
  const cx = 165;
  const w = 150;
  const h = 72;
  const gap = 78;
  const top = 70;
  const diamond = (cy: number) => `M ${cx} ${cy - h / 2} L ${cx + w} ${cy} L ${cx} ${cy + h / 2} L ${cx - w} ${cy} Z`;
  return (
    <svg viewBox="0 0 480 420" className={className} role="img" aria-label="Abstract diagram of stacked system layers: automation, identity and access, network, infrastructure.">
      <line x1={cx} y1={top - 50} x2={cx} y2={top + gap * 3 + 60} stroke="#000" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      {[-w, w].map((dx) => (
        <line key={dx} x1={cx + dx} y1={top} x2={cx + dx} y2={top + gap * 3} stroke="#000" strokeWidth="0.75" opacity="0.25" />
      ))}
      {layers.map((label, i) => {
        const cy = top + i * gap;
        return (
          <g key={label}>
            <path d={diamond(cy)} fill={i === 0 ? "#000" : "#f2f0ea"} fillOpacity={i === 0 ? 0.92 : 1} stroke="#000" strokeWidth="1" />
            {i > 0
              ? [0.3, 0.55, 0.8].map((f, k) => <rect key={k} x={cx - w * f * 0.6 + k * 30 - 3} y={cy - 3 + (k - 1) * 8} width="6" height="6" fill="#000" />)
              : null}
            <line x1={cx + w} y1={cy} x2={cx + w + 26} y2={cy} stroke="#000" strokeWidth="1" />
            <text x={cx + w + 32} y={cy - 4} fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.4" fill="#5c5b57">L{String(4 - i).padStart(2, "0")}</text>
            <text x={cx + w + 32} y={cy + 10} fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="1.2" fill="#000">{label.toUpperCase()}</text>
          </g>
        );
      })}
      <rect width="6" height="6" x="-3" y="-3" fill="#f2f0ea" stroke="#000" className="packet" style={{ offsetPath: `path("M ${cx} ${top - 40} L ${cx} ${top + gap * 3 + 40}")` }} />
      <text x="20" y="400" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.4" fill="#5c5b57">FIG. 02 — SYSTEM LAYERS</text>
    </svg>
  );
}
