"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { SceneErrorBoundary, webglAvailable } from "@/components/three/canvas-shell";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

const StructureField = dynamic(() => import("@/components/three/structure-field"), { ssr: false });

/**
 * Shows the server-rendered SVG drawing first, then swaps in the 3D scene on
 * capable desktops (≥ 768 px, WebGL, no reduced motion). three.js is only
 * downloaded when the scene is actually used.
 */
export function HeroScene({ fallback }: { fallback: ReactNode }) {
  const reduced = useReducedMotionSafe();
  const [use3d, setUse3d] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const decide = () => setUse3d(mq.matches && !reduced && webglAvailable());
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, [reduced]);

  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-slow ease-out",
          ready && use3d ? "opacity-0" : "opacity-100",
        )}
      >
        {fallback}
      </div>
      {use3d ? (
        <SceneErrorBoundary fallback={null}>
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-slow ease-out",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <StructureField onReady={() => setReady(true)} />
          </div>
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
