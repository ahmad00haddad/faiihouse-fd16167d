import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("faii_preloader_done")) {
        setVisible(false);
        return;
      }
    } catch (e) {
      // Ignore
    }

    let start: number | null = null;
    let animationFrameId: number;
    const DURATION = 600; // 0.6 seconds to count to 100 (super fast)

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const rawProgress = Math.min((elapsed / DURATION) * 100, 100);
      
      // Easing out curve
      const easedProgress = Math.floor(rawProgress === 100 ? 100 : 100 - Math.pow(1 - rawProgress / 100, 3) * 100);
      
      setProgress(easedProgress);

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setAnimatingOut(true);
          setTimeout(() => {
            setVisible(false);
            try { sessionStorage.setItem("faii_preloader_done", "true"); } catch(e) {}
          }, 400); // reduced from 800
        }, 100); // reduced from 400
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${
        animatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute top-0 inset-x-0 h-3 film-strip opacity-40" />
      <div className="absolute bottom-0 inset-x-0 h-3 film-strip opacity-40" />
      
      <div className="relative flex flex-col items-center">
        <div className="text-primary text-xs tracking-[0.5em] mb-4">FAII HOUSE</div>
        <div className="text-[5rem] md:text-[7rem] font-display text-foreground leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          {progress}
          <span className="text-3xl md:text-5xl text-primary">%</span>
        </div>
        
        <div className="w-48 h-[1px] bg-border mt-8 overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-100 ease-out shadow-[0_0_10px_#e5b95e]" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="text-muted-foreground text-[10px] tracking-[0.3em] mt-4 uppercase animate-pulse">
          Loading Scene...
        </div>
      </div>
    </div>
  );
}
