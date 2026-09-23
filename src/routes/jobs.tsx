import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { submitJobApplication } from "@/lib/leads.functions";
import { Send, Check, Film, Camera, Edit3, Sparkles } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  component: JobsPage,
  head: () => ({
    meta: [
      { title: "انضم لفريقنا — Faii House" },
      { name: "description", content: "فرص العمل في فَيّ هاوس — انضم لفريق سينمائي شغوف." },
      { property: "og:title", content: "انضم لفريقنا — Faii House" },
      { property: "og:url", content: "https://faiihouse.lovable.app/jobs" },
    ],
    links: [{ rel: "canonical", href: "https://faiihouse.lovable.app/jobs" }],
  }),
});

type FormState = {
  name: string; email: string; phone: string; location: string; start_when: string;
  portfolio_url: string; why: string; skills: string; edge: string;
};
const blank: FormState = { name: "", email: "", phone: "", location: "", start_when: "", portfolio_url: "", why: "", skills: "", edge: "" };

const roles = [
  { icon: Camera, title: "صُنّاع الصورة", desc: "مدراء تصوير، مصورون، ومصممو إضاءة يقدرون التكوين الفني." },
  { icon: Edit3, title: "السرد القصصي", desc: "كتاب سيناريو ونصوص إعلانية يتقنون تحويل الأفكار إلى قصص." },
  { icon: Film, title: "فنانو المونتاج", desc: "خبراء مونتاج وتلوين ومؤثرات بصرية يهتمون بأدق التفاصيل." },
  { icon: Sparkles, title: "المواهب الفريدة", desc: "نرحب دوماً بأي موهبة استثنائية ترى في نفسها إضافة لفريقنا." },
];

function JobsPage() {
  const submit = useServerFn(submitJobApplication);
  const [form, setForm] = useState<FormState>(blank);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof FormState, v: string) => setForm({ ...form, [k]: v });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await submit({ data: form });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء الإرسال، حاول مجدداً.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SiteHeader />

      {/* Cinematic Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-10 min-h-[70vh] flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-4 film-strip opacity-30" />
          <div className="absolute bottom-0 inset-x-0 h-4 film-strip opacity-30" />
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs tracking-[0.3em] mb-8 font-display">
              JOIN THE TEAM
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              مساحة للإبداع،
              <br />
              <span className="text-primary italic">تجمعنا الرؤية والإتقان</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              نؤمن في فَيّ بأن الأعمال العظيمة تُصنع بجهد جماعي وشغف حقيقي بالصناعة. نحن فريق يُقدر الحرفة والالتزام، ونرحب دائماً بالمواهب التي تشاركنا نفس القيم لتقديم مشاريع تترك أثراً بصرياً وفنياً عالياً.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-20 px-6 lg:px-10 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl">مجالات الشغف المشترك</h2>
              <p className="text-muted-foreground mt-4">بابنا مفتوح دائماً لأصحاب الموهبة والحرفة.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <r.icon size={24} />
                  </div>
                  <h3 className="text-xl text-foreground mb-3 font-medium">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-32 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-xs tracking-[0.3em] text-primary mb-3">APPLY NOW</div>
              <h2 className="font-display text-3xl md:text-5xl text-foreground">لنبدأ الحوار</h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            {sent ? (
              <div className="p-12 text-center rounded-3xl bg-surface border border-border shadow-elevated">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Check size={40} strokeWidth={2} />
                </div>
                <h3 className="font-display text-3xl mb-4">تم الاستلام بنجاح</h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  شكراً لاهتمامك بالانضمام لفريقنا. سيقوم فريق الإخراج بمراجعة أعمالك، وسنتواصل معك قريباً في حال وجود فرصة تتناسب مع مهاراتك.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-8 md:p-12 rounded-[2.5rem] bg-surface border border-border shadow-elevated">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="field">
                    <input id="j-name" placeholder=" " required value={form.name} onChange={(e) => set("name", e.target.value)} />
                    <label htmlFor="j-name">الاسم الثلاثي</label>
                  </div>
                  <div className="field">
                    <input id="j-email" type="email" placeholder=" " required dir="ltr" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    <label htmlFor="j-email">البريد الإلكتروني</label>
                  </div>
                  <div className="field">
                    <input id="j-phone" type="tel" placeholder=" " dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    <label htmlFor="j-phone">رقم الهاتف</label>
                  </div>
                  <div className="field">
                    <input id="j-loc" placeholder=" " value={form.location} onChange={(e) => set("location", e.target.value)} />
                    <label htmlFor="j-loc">مكان الإقامة</label>
                  </div>
                </div>

                <div className="field mb-6">
                  <input id="j-port" type="url" placeholder=" " dir="ltr" required value={form.portfolio_url} onChange={(e) => set("portfolio_url", e.target.value)} />
                  <label htmlFor="j-port">رابط معرض الأعمال (Behance, Vimeo, Drive)</label>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="field">
                    <textarea id="j-why" placeholder=" " rows={3} required value={form.why} onChange={(e) => set("why", e.target.value)} />
                    <label htmlFor="j-why">لماذا فَيّ تحديداً؟</label>
                  </div>
                  <div className="field">
                    <textarea id="j-edge" placeholder=" " rows={3} value={form.edge} onChange={(e) => set("edge", e.target.value)} />
                    <label htmlFor="j-edge">ما الذي يميز أسلوبك عن غيرك؟</label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
                  <p className="text-xs text-muted-foreground">راجع بياناتك قبل الإرسال 🎬</p>
                  <button
                    type="submit"
                    disabled={sending || !form.name || !form.email || !form.portfolio_url}
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-primary-foreground font-medium hover:shadow-glow transition-all disabled:opacity-60 overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative">{sending ? "جاري الإرسال..." : "إرسال الطلب"}</span>
                    <Send size={18} className="relative group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {error && <p className="mt-6 text-sm text-center text-destructive">{error}</p>}
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
