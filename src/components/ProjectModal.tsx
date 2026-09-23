import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import LazyImage from "./LazyImage";

export type Project = {
  image: string;
  title: string;
  category: string;
  behance?: string;
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpen(false);
      document.body.style.overflow = "";
    }
  }, [project]);

  if (!project && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-5xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 delay-100 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-background hover:text-primary transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-black">
            {project?.image && (
              <LazyImage
                src={project.image}
                alt={project?.title || ""}
                wrapperClassName="absolute inset-0"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            <div className="absolute top-0 inset-x-0 h-2 film-strip opacity-20" />
            <div className="absolute bottom-0 inset-x-0 h-2 film-strip opacity-20" />

            <div className="text-xs tracking-[0.4em] text-primary uppercase mb-4">
              {project?.category}
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6 leading-[1.1]">
              {project?.title}
            </h2>
            
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 border-r-2 border-primary/20 pr-4">
              مشروع سينمائي مميز من إنتاج فَيّ هاوس. نحن نهتم بكل تفصيلة بصرية لتصل الفكرة للمشاهد بأفضل صورة ممكنة.
            </p>

            <a
              href={project?.behance ?? "https://www.behance.net/faiihouse"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto rounded-full bg-gradient-primary px-8 py-4 text-primary-foreground font-medium hover:shadow-glow transition-all"
            >
              <span>المشروع الكامل على Behance</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
