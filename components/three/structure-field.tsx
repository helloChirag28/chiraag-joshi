"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  ACCENT_NODES,
  RIBS,
  POINTS_PER_RIB,
  seeded,
  structurePoints,
  structureSegments,
} from "@/lib/three/structure";

const ASSEMBLE_SECONDS = 1.6;
const MAX_TILT = (4 * Math.PI) / 180; // ≤ 4° pointer parallax
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

type V3 = [number, number, number];

interface SceneData {
  target: V3[];
  start: V3[];
  current: V3[];
  segments: [number, number][];
  plainIdx: number[];
  lineGeo: THREE.BufferGeometry;
  nodeGeo: THREE.BufferGeometry;
  accentGeo: THREE.BufferGeometry;
}

function geometry(count: number) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  return g;
}

function createSceneData(): SceneData {
  const target = structurePoints();
  const spread = 2.2;
  const start = target.map(
    ([x, y, z], i) =>
      [
        x + (seeded(i) - 0.5) * spread,
        y + (seeded(i + 999) - 0.5) * spread,
        z + (seeded(i + 1999) - 0.5) * spread,
      ] as V3,
  );
  const segments = structureSegments();
  const plainIdx = target.map((_, i) => i).filter((i) => !ACCENT_NODES.includes(i));
  return {
    target,
    start,
    current: target.map(() => [0, 0, 0] as V3),
    segments,
    plainIdx,
    lineGeo: geometry(segments.length * 2),
    nodeGeo: geometry(plainIdx.length),
    accentGeo: geometry(ACCENT_NODES.length),
  };
}

function disposeSceneData(d: SceneData) {
  d.lineGeo.dispose();
  d.nodeGeo.dispose();
  d.accentGeo.dispose();
}

/** Writes the assembly state at progress p (0..1) into the GPU buffers. */
function writeFrame(d: SceneData, p: number) {
  const { target, start, current: cur } = d;
  for (let i = 0; i < target.length; i++) {
    const rib = Math.floor(i / POINTS_PER_RIB);
    const local = Math.min(1, Math.max(0, (p - (rib / RIBS) * 0.35) / 0.65));
    const k = easeOut(local);
    for (let a = 0; a < 3; a++) cur[i][a] = start[i][a] + (target[i][a] - start[i][a]) * k;
  }
  const lines = d.lineGeo.attributes.position as THREE.BufferAttribute;
  const nodes = d.nodeGeo.attributes.position as THREE.BufferAttribute;
  const accents = d.accentGeo.attributes.position as THREE.BufferAttribute;
  d.segments.forEach(([a, b], s) => {
    lines.setXYZ(s * 2, cur[a][0], cur[a][1], cur[a][2]);
    lines.setXYZ(s * 2 + 1, cur[b][0], cur[b][1], cur[b][2]);
  });
  d.plainIdx.forEach((i, n) => nodes.setXYZ(n, cur[i][0], cur[i][1], cur[i][2]));
  ACCENT_NODES.forEach((i, n) => accents.setXYZ(n, cur[i][0], cur[i][1], cur[i][2]));
  lines.needsUpdate = true;
  nodes.needsUpdate = true;
  accents.needsUpdate = true;
  if (p >= 1) {
    d.lineGeo.computeBoundingSphere();
    d.nodeGeo.computeBoundingSphere();
    d.accentGeo.computeBoundingSphere();
  }
}

/**
 * Closest camera distance at which every point of the finished structure stays
 * inside the view (with margin for the pointer tilt), for any canvas aspect.
 */
function fitCamera(cam: THREE.PerspectiveCamera, aspect: number, target: V3[]) {
  cam.aspect = aspect;
  cam.updateProjectionMatrix();
  const pts = target.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const center = new THREE.Box3().setFromPoints(pts).getCenter(new THREE.Vector3());
  const dir = new THREE.Vector3(4.4, 4.6, 6.4).normalize();
  const v = new THREE.Vector3();
  const fits = (d: number) => {
    cam.position.copy(center).addScaledVector(dir, d);
    cam.lookAt(center);
    cam.updateMatrixWorld();
    return pts.every((p) => {
      v.copy(p).project(cam);
      return Math.abs(v.x) <= 0.86 && Math.abs(v.y) <= 0.86;
    });
  };
  let lo = 2;
  let hi = 60;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (fits(mid)) hi = mid;
    else lo = mid;
  }
  fits(hi);
}

interface Palette {
  line: string;
  node: string;
  accent: string;
}

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    line: v("--line-strong", "#3a3a40"),
    node: v("--fg-faint", "#75756f"),
    accent: v("--signal", "#ff5b1f"),
  };
}

function Structure({
  palette,
  pointer,
  visible,
}: {
  palette: Palette;
  pointer: React.RefObject<{ x: number; y: number }>;
  visible: React.RefObject<boolean>;
}) {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  const data = useMemo(() => createSceneData(), []);
  useEffect(() => () => disposeSceneData(data), [data]);

  // Fit the frame to the canvas: find the closest camera distance at which
  // every point of the finished structure stays inside the view, with margin
  // for the ≤ 4° pointer tilt. Works for any canvas aspect ratio.
  useEffect(() => {
    fitCamera(camera as THREE.PerspectiveCamera, width / Math.max(1, height), data.target);
    invalidate();
  }, [camera, width, height, invalidate, data]);

  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!visible.current) return;
    let active = false;
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta / ASSEMBLE_SECONDS);
      writeFrame(data, progress.current);
      active = true;
    }
    const g = group.current;
    const p = pointer.current;
    if (g && p) {
      const ty = p.x * MAX_TILT;
      const tx = -p.y * MAX_TILT;
      const k = Math.min(1, delta * 4);
      g.rotation.y += (ty - g.rotation.y) * k;
      g.rotation.x += (tx - g.rotation.x) * k;
      if (Math.abs(ty - g.rotation.y) > 1e-4 || Math.abs(tx - g.rotation.x) > 1e-4) active = true;
    }
    if (active) invalidate();
  });

  return (
    <group ref={group}>
      <lineSegments geometry={data.lineGeo} frustumCulled={false}>
        <lineBasicMaterial color={palette.line} />
      </lineSegments>
      <points geometry={data.nodeGeo} frustumCulled={false}>
        <pointsMaterial color={palette.node} size={3} sizeAttenuation={false} />
      </points>
      <points geometry={data.accentGeo} frustumCulled={false}>
        <pointsMaterial color={palette.accent} size={8} sizeAttenuation={false} />
      </points>
    </group>
  );
}

/** The single WebGL element on the site. Pauses when off-screen; renders on demand. */
export default function StructureField({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const visible = useRef(true);
  const [palette, setPalette] = useState<Palette | null>(null);
  const invalidateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const update = () => {
      setPalette(readPalette());
      invalidateRef.current?.();
    };
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) invalidateRef.current?.();
    });
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !visible.current) return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      invalidateRef.current?.();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      {palette ? (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [5.6, 2.6, 6.8], fov: 32, near: 0.1, far: 50 }}
          onCreated={(state) => {
            invalidateRef.current = () => state.invalidate();
            onReady?.();
          }}
          aria-hidden
        >
          <Structure palette={palette} pointer={pointer} visible={visible} />
        </Canvas>
      ) : null}
    </div>
  );
}
