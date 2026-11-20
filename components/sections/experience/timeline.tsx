"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { CapabilityMarker, ExperienceRole, Month, StackLane } from "@/types/content";
import { formatMonth, monthIndex } from "@/lib/date/month";
import { useReveal } from "@/lib/hooks/use-reveal";
import { drawX, pop, withDelay } from "@/lib/motion/variants";
import { duration, ease } from "@/lib/motion/tokens";
import { MonoLabel } from "@/components/primitives/mono-label";
import { TagList } from "@/components/primitives/tag";
import { cn } from "@/lib/utils";

interface TimelineProps {
  roles: ExperienceRole[];
  lanes: StackLane[];
  markers: CapabilityMarker[];
  /** Current month, computed on the server so both renders agree. */
  now: Month;
  start: Month;
}

const fill = (delay: number) => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: duration.slow, ease: ease.out, delay } },
});

export function Timeline({ roles, lanes, markers, now, start }: TimelineProps) {
  const [active, setActive] = useState<string | null>(null);
  const { ref, controls } = useReveal<HTMLDivElement>({ amount: 0.25 });

  const from = monthIndex(start);
  const to = monthIndex(now) + 3; // a little air after NOW
  const span = to - from;
  const pos = (m: Month | "present") => ((monthIndex(m === "present" ? now : m) - from) / span) * 100;
  const years: number[] = [];
  for (let y = Number(start.slice(0, 4)); y <= Number(now.slice(0, 4)); y++) years.push(y);
  const quarters: number[] = [];
  for (let m = from; m <= to; m += 3) quarters.push(((m - from) / span) * 100);

  const chronological = [...roles].sort((a, b) => monthIndex(a.start) - monthIndex(b.start));
  const roleOf = (label: string) => roles.filter((r) => r.stack.includes(label)).map((r) => r.id);
  const nowPct = pos(now);

  return (
    <div>
      {/* Gantt view: tablet and up. The same facts are in the list below. */}
      <motion.div
        ref={ref}
        initial={false}
        animate={controls}
        className="relative hidden md:block"
        role="group"
        aria-label="Career timeline chart"
      >
        {/* quarter ticks + NOW line, across every row */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-[8.5rem] right-0 top-10">
          {quarters.map((q) => (
            <div key={q} className="absolute inset-y-0 w-px bg-line/50" style={{ left: `${q}%` }} />
          ))}
          <div className="absolute inset-y-0 w-px bg-signal" style={{ left: `${nowPct}%` }} />
        </div>

        {/* axis */}
        <div className="grid grid-cols-[7rem_1fr] gap-x-6">
          <div />
          <div className="relative h-10">
            {years.map((y) => {
              const left = pos(`${y}-01` as Month);
              return left >= 0 ? (
                <span
                  key={y}
                  className="absolute top-0 whitespace-nowrap font-mono text-mono-label text-fg-muted"
                  style={{ left: `${left}%` }}
                >
                  {y}
                </span>
              ) : null;
            })}
            <span
              className="absolute top-0 -translate-x-1/2 whitespace-nowrap bg-bg px-1 font-mono text-mono-label uppercase text-signal"
              style={{ left: `${nowPct}%` }}
            >
              ▲ Now
            </span>
            <motion.div variants={drawX} className="absolute bottom-0 left-0 h-px w-full origin-left bg-line-strong" />
          </div>
        </div>

        {/* role track */}
        <Row label="Role">
          {chronological.map((r, i) => {
            const left = pos(r.start);
            const width = pos(r.end === "present" ? now : r.end) - left + (r.end === "present" ? 0 : (1 / span) * 100);
            const on = active === r.id;
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                aria-describedby={`role-${r.id}`}
                onMouseEnter={() => setActive(r.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(on ? null : r.id)}
                className="group absolute top-0 text-left focus-visible:outline-none"
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                <span
                  className={cn(
                    "relative block h-8 overflow-hidden rounded-sm border transition-colors duration-fast",
                    on ? "border-data" : "border-line-strong",
                    "group-focus-visible:ring-2 group-focus-visible:ring-signal group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg",
                  )}
                >
                  <motion.span
                    variants={fill(0.3 + i * 0.15)}
                    className={cn(
                      "absolute inset-0 origin-left transition-colors duration-fast",
                      on ? "bg-data/30" : "bg-surface-2",
                    )}
                  />
                  {r.end === "present" ? (
                    <span aria-hidden className="absolute right-2 top-1/2 -translate-y-1/2 text-fg-muted">▶</span>
                  ) : null}
                </span>
                <span className="mt-2 block pr-2 font-geist text-small font-medium text-fg">{r.title}</span>
                <span className="block pr-2 font-mono text-mono-label uppercase text-fg-muted">{r.location}</span>
              </button>
            );
          })}
        </Row>

        {/* stack lanes */}
        <Row label="Stack" className="pt-6">
          <ul className="space-y-2.5">
            {lanes.map((lane, i) => {
              const left = pos(lane.start);
              const right = lane.end === "present" ? nowPct : pos(lane.end) + (1 / span) * 100;
              const ongoing = lane.end === "present";
              const owners = roleOf(lane.label);
              const dim = active !== null && !owners.includes(active);
              return (
                <li key={lane.label} className="relative h-5">
                  <motion.div
                    variants={withDelay(drawX, 0.6 + Math.min(i, 8) * 0.04)}
                    className={cn("absolute top-1/2 h-px origin-left transition-opacity duration-fast", ongoing ? "bg-data" : "bg-fg-faint", dim && "opacity-25")}
                    style={{ left: `${left}%`, width: `${right - left}%` }}
                  />
                  <span
                    aria-hidden
                    className={cn("absolute top-1/2 h-2.5 w-px -translate-y-1/2", ongoing ? "bg-data" : "bg-fg-faint", dim && "opacity-25")}
                    style={{ left: `${right}%` }}
                  />
                  <span
                    className={cn(
                      "absolute -top-0.5 bg-bg pr-2 font-mono text-mono-label uppercase transition-opacity duration-fast",
                      ongoing ? "text-fg" : "text-fg-muted",
                      dim && "opacity-40",
                    )}
                    style={{ left: `${left}%` }}
                  >
                    {lane.label}
                    <span className="sr-only">
                      : {formatMonth(lane.start)} – {formatMonth(lane.end)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Row>

        {/* capability markers */}
        <Row label="Resp." className="pt-6">
          <ul className="relative h-8">
            {markers.map((m) => (
              <li key={m.label} className="absolute top-0 flex items-center gap-2" style={{ left: `${pos(m.at)}%` }}>
                <motion.span
                  variants={withDelay(pop, 1.1)}
                  aria-hidden
                  className={cn("block h-2.5 w-2.5 -translate-x-1/2 rotate-45", m.emphasis === "accent" ? "bg-signal" : "bg-fg-muted")}
                />
                <span className="font-mono text-mono-label uppercase text-fg">
                  {m.label} <span className="text-fg-muted">({formatMonth(m.at)})</span>
                </span>
              </li>
            ))}
          </ul>
        </Row>
      </motion.div>

      {/* Semantic list: the role details. Vertical rail on mobile, two columns on desktop. */}
      <ol className="relative mt-0 space-y-10 border-l border-line pl-6 md:mt-14 md:grid md:grid-cols-2 md:gap-x-gutter md:space-y-0 md:border-l-0 md:pl-0">
        <li aria-hidden className="absolute -left-[5px] -top-1 h-2.5 w-2.5 rotate-45 bg-signal md:hidden" />
        {roles.map((r, i) => {
          const on = active === r.id;
          return (
            <li
              key={r.id}
              id={`role-${r.id}`}
              className={cn(
                "relative md:rounded-xl md:border md:p-6 md:transition-colors md:duration-fast",
                on ? "md:border-data/60 md:bg-surface-1" : "md:border-line",
                i === 0 ? "md:order-2" : "md:order-1",
              )}
              onMouseEnter={() => setActive(r.id)}
              onMouseLeave={() => setActive(null)}
            >
              <span aria-hidden className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full border border-line-strong bg-bg md:hidden" />
              <MonoLabel as="p">
                <time dateTime={r.start}>{formatMonth(r.start)}</time> —{" "}
                {r.end === "present" ? "Present" : <time dateTime={r.end}>{formatMonth(r.end)}</time>}
              </MonoLabel>
              <h3 className="mt-2 font-geist text-h3 font-medium text-fg">{r.title}</h3>
              <p className="mt-1 text-small text-fg-muted">
                {r.location}
                {r.additionalResponsibilities?.length ? (
                  <>
                    {" · "}
                    <span className="text-fg">Additional responsibility: {r.additionalResponsibilities.join(", ")}</span>
                  </>
                ) : null}
              </p>
              <p className="mt-4 text-body text-fg-muted">{r.summary ?? r.framing}</p>
              <ul className="mt-4 space-y-1.5">
                {r.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-small text-fg-muted">
                    <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-fg-faint" />
                    {item}
                  </li>
                ))}
              </ul>
              <TagList items={r.stack} className="mt-5" />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Row({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-[7rem_1fr] gap-x-6 pt-8", className)}>
      <MonoLabel className="pt-1">{label}</MonoLabel>
      <div className="relative min-h-[4.5rem]">{children}</div>
    </div>
  );
}
