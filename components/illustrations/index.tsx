import type { Project } from "@/types/content";
import { FormForgeIllustration } from "./formforge";
import { HiteshiIllustration } from "./hiteshi";
import { NeighbouraIllustration } from "./neighboura";
import { WorkforceIllustration } from "./workforce";

const map = {
  workforce: WorkforceIllustration,
  neighboura: NeighbouraIllustration,
  hiteshi: HiteshiIllustration,
  formforge: FormForgeIllustration,
} as const;

export function ProjectIllustration({ project }: { project: Project }) {
  const Comp = map[project.illustration];
  return <Comp label={project.illustrationLabel} caption={project.figure} />;
}
