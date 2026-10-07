import { useEffect, useState } from "react";

/**
 * Returns true once the element behind `ref` has scrolled into view.
 * By default it fires once and then stops observing (so a count-up
 * animation plays a single time, not on every scroll past the card).
 */
export default function useInView(ref, { threshold = 0.35, once = true } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Very old browsers: skip the wait and just show the final numbers.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return inView;
}
