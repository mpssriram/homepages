import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseImagePreloaderOptions = {
  frameCount: number;
  getFrameSrc: (index: number) => string;
  enabled?: boolean;
  batchSize?: number;
  frameStep?: number;
};

export type LoadedFrame = {
  index: number;
  image: HTMLImageElement;
};

export function useImagePreloader({
  frameCount,
  getFrameSrc,
  enabled = true,
  batchSize = 8,
  frameStep = 1,
}: UseImagePreloaderOptions) {
  const imagesRef = useRef(new Map<number, HTMLImageElement>());
  const requestedRef = useRef(new Set<number>());
  const [isInitialFrameReady, setIsInitialFrameReady] = useState(false);

  const orderedFrames = useMemo(() => {
    const safeFrameStep = Math.max(1, Math.floor(frameStep));
    const frames = [1];

    if (frameCount > 1) {
      frames.push(frameCount);
    }

    for (let index = 2; index <= frameCount; index += safeFrameStep) {
      if (index !== frameCount && !frames.includes(index)) {
        frames.push(index);
      }
    }

    return frames;
  }, [frameCount, frameStep]);

  const loadFrame = useCallback(
    (index: number) => {
      if (!enabled || requestedRef.current.has(index)) {
        return;
      }

      requestedRef.current.add(index);
      const image = new Image();

      image.onload = () => {
        imagesRef.current.set(index, image);

        if (index === 1) {
          setIsInitialFrameReady(true);
        }
      };

      image.onerror = () => {
        requestedRef.current.delete(index);
        console.warn(`Failed to load cockpit frame: ${index}`);
      };

      image.src = getFrameSrc(index);
    },
    [enabled, getFrameSrc],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;
    let cursor = 0;
    let timeoutId: number | undefined;

    const loadNextBatch = () => {
      if (cancelled) {
        return;
      }

      orderedFrames
        .slice(cursor, cursor + batchSize)
        .forEach((frameIndex) => loadFrame(frameIndex));

      cursor += batchSize;

      if (cursor < orderedFrames.length) {
        timeoutId = window.setTimeout(loadNextBatch, 48);
      }
    };

    loadNextBatch();

    return () => {
      cancelled = true;

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [batchSize, enabled, loadFrame, orderedFrames]);

  const getNearestLoadedFrame = useCallback(
    (targetFrame: number): LoadedFrame | null => {
      const exactImage = imagesRef.current.get(targetFrame);

      if (exactImage) {
        return { index: targetFrame, image: exactImage };
      }

      for (let distance = 1; distance <= frameCount; distance += 1) {
        const previous = targetFrame - distance;
        const next = targetFrame + distance;
        const previousImage = imagesRef.current.get(previous);
        const nextImage = imagesRef.current.get(next);

        if (previousImage) {
          return { index: previous, image: previousImage };
        }

        if (nextImage) {
          return { index: next, image: nextImage };
        }
      }

      return null;
    },
    [frameCount],
  );

  return {
    isInitialFrameReady,
    getNearestLoadedFrame,
  };
}
