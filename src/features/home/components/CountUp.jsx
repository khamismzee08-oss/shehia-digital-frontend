import React, { useEffect, useRef, useState } from "react";

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

/**
 * Animates a number from 0 up to `value`.
 *  - `value`  : the real number from the backend (null/undefined -> shows "—")
 *  - `start`  : the animation waits until this is true (e.g. card scrolled into view)
 *  - `duration`: animation length in ms
 * Users who prefer reduced motion get the final number immediately.
 */
export default function CountUp({ value, start = true, duration = 1800 }) {
  const [display, setDisplay] = useState(0);
  const shown = useRef(0);

  useEffect(() => {
    if (!start || typeof value !== "number") return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion || duration <= 0) {
      shown.current = value;
      setDisplay(value);
      return undefined;
    }

    const from = shown.current;
    const startedAt = performance.now();
    let raf;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const current = Math.round(from + (value - from) * easeOutCubic(progress));
      shown.current = current;
      setDisplay(current);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration]);

  if (typeof value !== "number") return <span>—</span>;
  return <span>{display.toLocaleString("en-US")}</span>;
}
