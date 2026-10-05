import type { ProjectVisual as Kind } from "@/data/projects";

const S = { stroke: "#fff", strokeWidth: 1, fill: "none" } as const;
const mono = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 1.4, fill: "#9a9a9a" } as const;

function Pipeline({ labels = ["RUN", "TEST", "LOG", "REPORT"] }: { labels?: string[] }) {
  const xs = [30, 140, 250, 360];
  return (
    <g>
      <rect x="120" y="40" width="210" height="140" {...S} stroke="#9a9a9a" strokeDasharray="3 5" />
      <text x="120" y="32" {...mono}>{labels[0] === "RUN" ? "CONTROLLED ENVIRONMENT" : "ACCESS-CONTROLLED"}</text>
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y="88" width="60" height="44" {...S} fill={i === 0 ? "#fff" : "#090909"} />
          {i < xs.length - 1 ? <line x1={x + 60} y1="110" x2={xs[i + 1]} y2="110" {...S} className="dash-flow" /> : null}
          <text x={x} y="152" {...mono}>{labels[i]}</text>
        </g>
      ))}
      <rect width="6" height="6" x="-3" y="-3" fill="#fff" className="packet" style={{ offsetPath: 'path("M 90 110 L 360 110")' }} />
    </g>
  );
}

function Graph() {
  const n = [[40, 60], [120, 40], [110, 140], [200, 90], [290, 50], [300, 160], [390, 105]];
  const e = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]];
  const path = [0, 1, 3, 4, 6];
  return (
    <g>
      {e.map(([a, b]) => {
        const hot = path.includes(a) && path.includes(b) && Math.abs(path.indexOf(a) - path.indexOf(b)) === 1;
        return <line key={`${a}-${b}`} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={hot ? "#fff" : "#9a9a9a"} strokeWidth={hot ? 1.25 : 0.75} opacity={hot ? 1 : 0.5} className={hot ? "dash-flow" : undefined} />;
      })}
      {n.map(([x, y], i) => (
        <rect key={i} x={x - 6} y={y - 6} width="12" height="12" fill={i === 6 ? "#fff" : "#090909"} stroke="#fff" />
      ))}
      <text x="22" y="190" {...mono}>ENTRY</text>
      <text x="350" y="190" {...mono}>SENSITIVE</text>
    </g>
  );
}

function Cloud() {
  const subnets = [
    { x: 60, label: "PUBLIC SUBNET", node: "BASTION" },
    { x: 230, label: "PRIVATE SUBNET", node: "WEB" },
  ];
  return (
    <g>
      <rect x="30" y="30" width="370" height="150" {...S} stroke="#9a9a9a" />
      <text x="40" y="48" {...mono}>VPC</text>
      {subnets.map((sn, i) => (
        <g key={sn.x}>
          <rect x={sn.x} y="62" width="140" height="96" {...S} strokeDasharray="3 4" />
          <text x={sn.x + 10} y="78" {...mono}>{sn.label}</text>
          <rect x={sn.x + 20} y="98" width="64" height="32" {...S} fill={i === 0 ? "#fff" : "#090909"} />
          <text x={sn.x + 26} y="146" {...mono}>{sn.node}</text>
          <text x={sn.x + 92} y="98" {...mono} fontSize={8}>SG</text>
          <text x={sn.x + 104} y="152" {...mono} fontSize={8}>NACL</text>
        </g>
      ))}
      <line x1="144" y1="114" x2="250" y2="114" {...S} className="dash-flow" />
      <text x="168" y="130" {...mono} fontSize={8}>ADMIN</text>
      <text x="30" y="200" {...mono}>NAT GW → OUTBOUND</text>
      <text x="262" y="200" {...mono}>FLOW LOGS → CLOUDWATCH</text>
    </g>
  );
}

function Network() {
  return (
    <g>
      <rect x="190" y="24" width="50" height="30" {...S} fill="#fff" />
      <text x="168" y="18" {...mono}>ROUTER</text>
      {[110, 320].map((x) => (
        <g key={x}>
          <line x1="215" y1="54" x2={x + 20} y2="92" {...S} />
          <rect x={x} y="92" width="40" height="24" {...S} />
        </g>
      ))}
      {[[50, "VLAN 10"], [150, "VLAN 20"], [270, "VLAN 30"], [370, "VLAN 40"]].map(([x, label], i) => (
        <g key={i}>
          <line x1={i < 2 ? 130 : 340} y1="116" x2={(x as number) + 10} y2="156" {...S} stroke="#9a9a9a" />
          <rect x={x as number} y="156" width="20" height="20" {...S} />
          <text x={(x as number) - 10} y="194" {...mono}>{label}</text>
        </g>
      ))}
    </g>
  );
}

const map = { pipeline: Pipeline, graph: Graph, cloud: Cloud, network: Network };

export function ProjectVisual({ kind, labels, className }: { kind: Kind; labels?: string[]; className?: string }) {
  const C = map[kind];
  return (
    <svg viewBox="0 0 430 210" className={className} aria-hidden>
      {kind === "pipeline" ? <Pipeline labels={labels} /> : <C />}
    </svg>
  );
}
