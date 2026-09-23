import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // Only run on the first visit per session so we don't annoy the user
    if (sessionStorage.getItem("faii_preloader_done")) {
      setVisible(false);
      return;
    }

    // Fast cinematic loading progress (0 to 100 in ~1.5s)
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setAnimatingOut(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("faii_preloader_done", "true");
          }, 800); // Match fade-out transition duration
        }, 400); // short delay at 100%
      }
      setProgress(current);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
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
