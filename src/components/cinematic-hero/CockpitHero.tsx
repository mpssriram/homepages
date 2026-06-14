import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useImagePreloader } from "../../hooks/useImagePreloader";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { DevLoader } from "../ui/DevLoader";
import {
  clamp,
  COCKPIT_FRAME_COUNT,
  getCockpitFrameSrc,
} from "../../lib/cinematicSequence";
import { CockpitCanvasSequence } from "./CockpitCanvasSequence";
import { HeroOverlay } from "./HeroOverlay";

function useSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const update = () => setIsSmallMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isSmallMobile;
}

export function CockpitHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const reducedMotion = useReducedMotion();
  const isSmallMobile = useSmallMobile();
  const shouldUseStaticFallback = reducedMotion || isSmallMobile;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const acquireOpacity = useTransform(
    scrollYProgress,
    [0.82, 0.9, 1],
    [0, 1, 1],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1],
  );
  const { isInitialFrameReady, getNearestLoadedFrame } =
    useImagePreloader({
      frameCount: COCKPIT_FRAME_COUNT,
      getFrameSrc: getCockpitFrameSrc,
      enabled: !shouldUseStaticFallback,
      batchSize: 4,
      frameStep: 2,
    });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (shouldUseStaticFallback) {
      return;
    }

    const sequenceProgress = Math.min(progress / 0.86, 1);
    const rawFrame =
      Math.round(sequenceProgress * (COCKPIT_FRAME_COUNT - 1)) + 1;
    const nextFrame = clamp(rawFrame, 1, COCKPIT_FRAME_COUNT);

    setFrameIndex((currentFrame) =>
      currentFrame === nextFrame ? currentFrame : nextFrame,
    );
  });

  if (shouldUseStaticFallback) {
    return (
      <section className="static-hero" id="top" ref={sectionRef}>
        <img
          src="/cockpit-poster.webp"
          alt="Futuristic cockpit overlooking a cyber city"
        />
        <HeroOverlay acquireOpacity={1} hideScrollCue />
      </section>
    );
  }

  return (
    <section className="cockpit-hero" id="top" ref={sectionRef}>
      <motion.div className="sticky-viewport">
        <CockpitCanvasSequence
          frameIndex={frameIndex}
          frameCount={COCKPIT_FRAME_COUNT}
          getNearestLoadedFrame={getNearestLoadedFrame}
        />
        <motion.div
          className="canvas-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: isInitialFrameReady ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <DevLoader label="Loading cockpit sequence..." />
        </motion.div>
        <HeroOverlay
          acquireOpacity={acquireOpacity}
          cueOpacity={cueOpacity}
          overlayOpacity={overlayOpacity}
          hideScrollCue={frameIndex > 4}
        />
      </motion.div>
    </section>
  );
}
