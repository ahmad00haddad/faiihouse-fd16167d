import { useEffect } from "react";

/**
 * Very subtle site-wide magnetic effect on buttons and links.
 * Movement is intentionally tiny (max ~4px) for a refined feel.
 */
export default function MagneticCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip touch devices

    const STRENGTH = 0.12; // very light
    const MAX = 4; // px
    const SELECTOR = 'a, button, [data-magnetic]';
    
    let activeElement: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(SELECTOR) as HTMLElement | null;
      
      // Reset any previously magnetized element if we moved away
      if (activeElement && activeElement !== target) {
        activeElement.style.transform = "";
        activeElement.style.transition = "transform 350ms cubic-bezier(.2,.8,.2,1)";
        activeElement = null;
      }
      
      if (!target) return;
      
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      const x = Math.max(-MAX, Math.min(MAX, dx));
      const y = Math.max(-MAX, Math.min(MAX, dy));
      
      target.style.transition = "transform 120ms cubic-bezier(.2,.8,.2,1)";
      target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      activeElement = target;
    };

    const onLeave = () => {
      if (activeElement) {
        activeElement.style.transform = "";
        activeElement.style.transition = "transform 350ms cubic-bezier(.2,.8,.2,1)";
        activeElement = null;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return null;
}
