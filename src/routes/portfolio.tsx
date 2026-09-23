import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import LazyImage from "@/components/LazyImage";
import ProjectModal, { type Project } from "@/components/ProjectModal";
import { type PortCategory, defaultContent } from "@/data/site";
import { useSiteContent } from "@/hooks/use-site-content";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "أعمالنا — Faii House" },
      { name: "description", content: "معرض أعمال فَيّ هاوس — أفلام قصيرة، وثائقيات وإعلانات سينمائية." },
      { property: "og:title", content: "أعمالنا — Faii House" },
      { property: "og:description", content: "معرض أعمال فَيّ هاوس — أفلام قصيرة، وثائقيات وإعلانات سينمائية." },
      { property: "og:url", content: "https://faiihouse.lovable.app/portfolio" },
    ],
    links: [
      { rel: "canonical", href: "https://faiihouse.lovable.app/portfolio" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: defaultContent.portfolio.slice(0, 12).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VideoObject",
              name: p.title,
              description: `${p.title} — ${p.category}`,
              thumbnailUrl: p.image,
              uploadDate: "2024-01-01",
              contentUrl: p.behance ?? "https://www.behance.net/faiihouse",
            },
          })),
        }),
      },
    ],
  }),
});

const filters: { id: PortCategory; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "film", label: "أفلام قصيرة" },
  { id: "documentary", label: "وثائقيات" },
  { id: "ads", label: "إعلانات" },
];

function PortfolioPage() {
  const { portfolio } = useSiteContent();
  const [active, setActive] = useState<PortCategory>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  const items = useMemo(() => {
    const arr = [...portfolio];
    return active === "all" ? arr : arr.filter((p) => p.category === active);
  }, [active, portfolio]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-40 pb-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-xs tracking-[0.35em] text-primary mb-4">— PORTFOLIO</div>
            <h1 className="font-display text-5xl md:text-7xl text-foreground leading-tight text-balance">
              قصص <span className="text-primary">صنعناها</span> بكاميراتنا.
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              اضغط على أي مشروع لمشاهدة تفاصيله الكاملة على Behance.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={`px-5 py-2.5 rounded-full text-sm border transition-all ${
                    active === f.id
                      ? "bg-primary text-primary-foreground border-primary shadow-glow"
                      : "border-border text-foreground/80 hover:text-primary hover:border-primary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-max">
            {items.map((p, i) => {
              const isFeatured = i % 7 === 0;
              return (
                <Reveal key={p.title + i} delay={(i % 8) * 40} className={isFeatured ? "sm:col-span-2 lg:col-span-2 xl:col-span-2" : "col-span-1"}>
                  <button
                    onClick={() => setActiveProject(p)}
                    className={`block w-full text-right group relative rounded-2xl overflow-hidden bg-surface ${isFeatured ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/5]"}`}
                  >
                    <LazyImage
                      src={p.image}
                      alt={p.title}
                      wrapperClassName="absolute inset-0"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 z-[1]" />
                    <div className="absolute top-4 left-4 z-[2] w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all shadow-glow">
                      <ExternalLink size={16} className="-translate-x-0.5" />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 z-[2] p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="text-xs tracking-[0.25em] text-primary uppercase mb-2">{p.category}</div>
                      <div className={`text-foreground font-medium ${isFeatured ? "text-2xl" : "text-lg"}`}>{p.title}</div>
                    </div>
                    <div className="absolute top-0 inset-x-0 z-[2] h-2 film-strip translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="absolute bottom-0 inset-x-0 z-[2] h-2 film-strip translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      <SiteFooter />
    </div>
  );
}
