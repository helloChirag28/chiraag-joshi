"use client";

import { useEffect, useRef } from "react";
import {
  ACCENT_NODES,
  VIEW,
  project,
  structurePoints,
  structureSegments,
  structureViewBox,
} from "@/lib/three/structure";

const points = structurePoints();
const segments = structureSegments();
const viewBox = structureViewBox().join(" ");
const r = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Lightweight animated structure for phones and tablets: no WebGL, no three.js.
 * The drawing sways slowly, accent nodes pulse, and a horizontal drag turns it.
 * Updates the SVG directly (no React re-renders) and pauses when off-screen.
 */
export function StructureSvg({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const nodes = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    let raf = 0;
    let visible = true;
    let drag = 0; // current drag yaw
    let dragTarget = 0;
    let startX: number | null = null;
    let startDrag = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      drag += (dragTarget - drag) * 0.12;
      const yaw = VIEW.yaw + Math.sin(t * 0.35) * VIEW.swayYaw + drag;
      const pitch = VIEW.pitch + Math.sin(t * 0.27) * VIEW.swayPitch;
      const p = points.map((pt) => project(pt, yaw, pitch));
      let d = "";
      for (const [a, b] of segments) d += `M${r(p[a][0])} ${r(p[a][1])}L${r(p[b][0])} ${r(p[b][1])}`;
      path.current?.setAttribute("d", d);
      const pulse = 1 + Math.sin(t * 2.2) * 0.25;
      p.forEach(([x, y], i) => {
        const c = nodes.current[i];
        if (!c) return;
        c.setAttribute("cx", String(r(x)));
        c.setAttribute("cy", String(r(y)));
        if (ACCENT_NODES.includes(i)) c.setAttribute("r", String(r(0.06 * pulse)));
      });
      if (visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(draw);
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(el);

    // Horizontal drag turns the structure; vertical swipes still scroll the page.
    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
      startDrag = dragTarget;
    };
    const onMove = (e: PointerEvent) => {
      if (startX === null) return;
      const dx = (e.clientX - startX) / Math.max(1, el.clientWidth);
      dragTarget = Math.max(-VIEW.maxDrag, Math.min(VIEW.maxDrag, startDrag + dx * 2.4));
    };
    const onUp = () => {
      startX = null;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const initial = points.map((pt) => project(pt, VIEW.yaw, VIEW.pitch));
  const initialPath = segments
    .map(([a, b]) => `M${r(initial[a][0])} ${r(initial[a][1])}L${r(initial[b][0])} ${r(initial[b][1])}`)
    .join("");
  return (
    <svg
      ref={svg}
      viewBox={viewBox}
      className={className}
      style={{ touchAction: "pan-y" }}
      aria-hidden
      focusable="false"
    >
      <path ref={path} d={initialPath} fill="none" stroke="var(--line-strong)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {initial.map(([x, y], i) => (
        <circle
          key={i}
          ref={(c) => {
            nodes.current[i] = c;
          }}
          cx={r(x)}
          cy={r(y)}
          r={ACCENT_NODES.includes(i) ? 0.06 : 0.022}
          fill={ACCENT_NODES.includes(i) ? "var(--signal)" : "var(--fg-faint)"}
        />
      ))}
    </svg>
  );
}
