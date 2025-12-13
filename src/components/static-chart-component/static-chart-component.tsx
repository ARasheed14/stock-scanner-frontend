import * as React from 'react';

type StaticChartProps = {
  changePct: number;
  height?: number;
  id?: string | number;
  durationMs?: number;
};

export default function StaticChartComponent({ changePct, height = 60, id, durationMs = 700 }: StaticChartProps) {
  // Internal drawing coordinate system (viewBox).
  // We keep this fixed so the polyline math stays simple, then scale via width="100%".
  const W = 300;
  const H = 60;

  // Use changePct to decide whether we render an "up" or "down" profile.
  // The chart is intentionally stylized (not time-series), so direction matters more than exact values.
  const up = changePct >= 0;
  const color = up ? '#16a34a' : '#ef4444';

  // Ensure multiple charts on the same page never collide in <defs> ids.
  // - useId(): stable unique id for this render tree
  // - id prop: lets caller force a stable suffix (useful in lists)
  const uid = React.useId();
  const suffix = id ?? uid;
  const clipId = `clip-${suffix}-${up ? 'up' : 'down'}`;
  const gradId = `grad-${suffix}-${up ? 'up' : 'down'}`;

  // Calculate these values to keep responsiveness intact.
  // Padding + evenly spaced x positions.
  // We place 4 points across the inner width so each segment is exactly 1/3 of innerW.
  // This creates a consistent “market sparkline” feel regardless of screen size.
  const pad = 12;
  const innerW = W - pad * 2;
  const xs = [0, 1, 2, 3].map(i => pad + (innerW * i) / 3);

  // Define a single "up" profile, then mirror it for "down"
  // SVG y increases downward, so smaller y = visually higher.
  const upYs = [42, 18, 34, 12];
  const mid = H / 2;
  const downYs = upYs.map(y => mid + (mid - y)); // mirror around midline

  // Mirror the up profile around the midline to produce a down profile.
  // This guarantees the down chart has the same “shape energy” as up,
  // without maintaining two separate sets of y coordinates.
  const ys = up ? upYs : downYs;

  // Combine x/y into points and serialize for the <polyline points="..." /> attribute.
  const pts = xs.map((x, i) => ({ x, y: ys[i] }));
  const polyPoints = pts.map(p => `${p.x},${p.y}`).join(' ');

  // Area fill under the line:
  // - Move to first point
  // - Line through all points
  // - Close the shape down to the baseline (H) to create a filled polygon
  const areaPath =
    `M ${pts[0].x} ${pts[0].y} ` +
    pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;

  const polyRef = React.useRef<SVGPolylineElement | null>(null);

  // Animate the stroke drawing in:
  // 1) Measure path length after render
  // 2) Set dasharray/dashoffset to fully hide the stroke
  // 3) On next frame, transition dashoffset back to 0 to "draw" the line
  React.useLayoutEffect(() => {
    const el = polyRef.current;
    if (!el) return;

    const length = el.getTotalLength();

    // Reset to 'hidden' so re-renders replay nicely
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
        {/* Clip to bounds to prevent gradient/area overflow */}
        <clipPath id={clipId}>
          <rect x="0" y="0" width={W} height={H} />
        </clipPath>

        {/* Simple vertical fade from line color down to transparent */}
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
