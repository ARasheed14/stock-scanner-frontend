import * as React from 'react';

type StaticChartProps = {
  changePct: number;
  height?: number;
  id?: string | number;
  durationMs?: number;
};

export default function StaticChartComponent({ changePct, height = 60, id, durationMs = 700 }: StaticChartProps) {
  const W = 300;
  const H = 60;

  const up = changePct >= 0;
  const color = up ? '#16a34a' : '#ef4444';

  const uid = React.useId();
  const suffix = id ?? uid;
  const clipId = `clip-${suffix}-${up ? 'up' : 'down'}`;
  const gradId = `grad-${suffix}-${up ? 'up' : 'down'}`;

  // ✅ Calculate these values to keep responsiveness intact
  const pad = 12;
  const innerW = W - pad * 2;
  const xs = [0, 1, 2, 3].map(i => pad + (innerW * i) / 3);

  // Define a single "up" profile, then mirror it for "down"
  const upYs = [42, 18, 34, 12];
  const mid = H / 2;
  const downYs = upYs.map(y => mid + (mid - y)); // mirror around midline

  const ys = up ? upYs : downYs;

  const pts = xs.map((x, i) => ({ x, y: ys[i] }));

  const polyPoints = pts.map(p => `${p.x},${p.y}`).join(' ');

  const areaPath =
    `M ${pts[0].x} ${pts[0].y} ` +
    pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;

  const polyRef = React.useRef<SVGPolylineElement | null>(null);

  // measure after render
  React.useLayoutEffect(() => {
    const el = polyRef.current;
    if (!el) return;

    const length = el.getTotalLength();

    // reset to 'hidden' so re-renders replay nicely
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      el.style.transition = `stroke-dashoffset ${durationMs}ms ease`;
      el.style.strokeDashoffset = '0';
    });

  }, [polyPoints, durationMs]);

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ display: 'block', overflow: 'hidden' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={W} height={H} />
        </clipPath>

        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <path d={areaPath} fill={`url(#${gradId})`} />
        <polyline
          ref={polyRef}
          points={polyPoints}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
