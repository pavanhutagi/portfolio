import { SceneRoot } from "@/components/canvas/scene-root";
import { LoadingVeil } from "@/components/ui/loading-veil";
import { PerfHud } from "@/components/ui/perf-hud";
import { ScrollProgressRail } from "@/components/ui/scroll-progress-rail";
import { ScrollStage } from "@/components/ui/scroll-stage";
import { SectionOverlay } from "@/components/ui/section-overlay";
import { SiteNav } from "@/components/ui/site-nav";
import { UnsupportedNotice } from "@/components/ui/unsupported-notice";

export default function HomePage() {
  return (
    <>
      <SceneRoot />

      <SiteNav />
      <SectionOverlay />
      <ScrollProgressRail />
      <ScrollStage />

      <LoadingVeil />
      <UnsupportedNotice />
      <PerfHud />
    </>
  );
}
