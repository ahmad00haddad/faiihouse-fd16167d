import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { submitJobApplication } from "@/lib/leads.functions";
import { Send, Check, ArrowUpLeft } from "lucide-react";

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
  { id: "01", title: "صُنّاع الصورة", desc: "مدراء تصوير، مصورون، ومصممو إضاءة يقدرون التكوين الفني." },
  { id: "02", title: "السرد القصصي", desc: "كتاب سيناريو ونصوص إعلانية يتقنون تحويل الأفكار إلى قصص." },
  { id: "03", title: "فنانو المونتاج", desc: "خبراء مونتاج وتلوين ومؤثرات بصرية يهتمون بأدق التفاصيل." },
  { id: "04", title: "المواهب الفريدة", desc: "نرحب دوماً بأي موهبة استثنائية ترى في نفسها إضافة لفريقنا." },
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
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      <SiteHeader />

      {/* Premium Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-10 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-primary/50" />
                  <span className="text-primary text-xs tracking-[0.4em] font-display uppercase">Join the Team</span>
                </div>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.1] mb-6">
                  مساحة للإبداع،
                  <br />
                  <span className="text-muted-foreground">تجمعنا الرؤية</span>
                  <br />
                  <span className="italic text-primary">والإتقان.</span>
                </h1>
              </Reveal>
            </div>
            
            <div className="lg:col-span-4 lg:pb-4">
              <Reveal delay={150}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  نؤمن في فَيّ بأن الأعمال العظيمة تُصنع بجهد جماعي وشغف حقيقي بالصناعة. نحن فريق يُقدر الحرفة والالتزام، ونرحب دائماً بالمواهب التي تشاركنا نفس القيم لتقديم مشاريع تترك أثراً بصرياً وفنياً عالياً.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Roles List */}
      <section className="py-24 px-6 lg:px-10 bg-surface/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center justify-between mb-16 border-b border-border pb-8">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">مجالات الشغف المشترك</h2>
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Expertise</span>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {roles.map((r, i) => (
              <Reveal key={r.id} delay={i * 100}>
                <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-border hover:border-primary transition-colors cursor-default relative overflow-hidden">
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 pointer-events-none" />
                  
                  <div className="flex items-baseline gap-6 md:gap-12 relative z-10 mb-4 md:mb-0">
                    <span className="font-display text-sm md:text-base text-muted-foreground tracking-widest">{r.id}</span>
                    <h3 className="font-display text-2xl md:text-4xl text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-8 relative z-10 md:max-w-md">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{r.desc}</p>
                    <ArrowUpLeft className="hidden md:block text-muted-foreground group-hover:text-primary transition-all group-hover:scale-110 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0" size={24} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist Split Form */}
      <section className="py-32 px-6 lg:px-10 relative">
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-primary/50" />
                  <span className="text-primary text-xs tracking-[0.4em] font-display uppercase">Apply Now</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">لنبدأ<br/>الحوار.</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-12 max-w-sm">
                  إذا كنت ترى أن أسلوبك يتناغم مع رؤيتنا، فلا تتردد في مشاركة أعمالك معنا. نحن نقرأ كل طلب بعناية.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={150}>
              {sent ? (
                <div className="h-full min-h-[400px] flex flex-col justify-center items-center text-center p-12 border border-border rounded-3xl bg-surface/30">
                  <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-8">
                    <Check size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl mb-4">تم الاستلام بنجاح</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                    شكراً لاهتمامك بالانضمام لفريقنا. سيقوم فريق الإخراج بمراجعة أعمالك، وسنتواصل معك قريباً في حال وجود فرصة تتناسب مع مهاراتك.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-10">
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input id="j-name" required value={form.name} onChange={(e) => set("name", e.target.value)}
                        className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="الاسم" />
                      <label htmlFor="j-name" className="absolute right-0 top-2 text-muted-foreground text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-5 peer-valid:text-xs cursor-text">الاسم الثلاثي</label>
                    </div>
                    <div className="relative group">
                      <input id="j-email" type="email" required dir="ltr" value={form.email} onChange={(e) => set("email", e.target.value)}
                        className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent text-left" placeholder="Email" />
                      <label htmlFor="j-email" className="absolute right-0 top-2 text-muted-foreground text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-5 peer-valid:text-xs cursor-text">البريد الإلكتروني</label>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input id="j-phone" type="tel" dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                        className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent text-left" placeholder="Phone" />
                      <label htmlFor="j-phone" className="absolute right-0 top-2 text-muted-foreground text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-5 peer-valid:text-xs cursor-text">رقم الهاتف</label>
                    </div>
                    <div className="relative group">
                      <input id="j-loc" value={form.location} onChange={(e) => set("location", e.target.value)}
                        className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Location" />
                      <label htmlFor="j-loc" className="absolute right-0 top-2 text-muted-foreground text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-5 peer-valid:text-xs cursor-text">مكان الإقامة</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input id="j-port" type="url" required dir="ltr" value={form.portfolio_url} onChange={(e) => set("portfolio_url", e.target.value)}
                      className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent text-left" placeholder="Portfolio URL" />
                    <label htmlFor="j-port" className="absolute right-0 top-2 text-muted-foreground text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-5 peer-valid:text-xs cursor-text">رابط معرض الأعمال (Behance, Vimeo, Drive)</label>
                  </div>

                  <div className="relative group pt-4">
                    <textarea id="j-why" required rows={3} value={form.why} onChange={(e) => set("why", e.target.value)}
                      className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none" placeholder="لماذا؟" />
                    <label htmlFor="j-why" className="absolute right-0 top-4 text-muted-foreground text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs cursor-text">لماذا فَيّ تحديداً؟</label>
                  </div>

                  <div className="relative group pt-4">
                    <textarea id="j-edge" rows={3} value={form.edge} onChange={(e) => set("edge", e.target.value)}
                      className="w-full bg-transparent border-b border-border pb-4 pt-2 text-foreground focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none" placeholder="الميزة؟" />
                    <label htmlFor="j-edge" className="absolute right-0 top-4 text-muted-foreground text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs cursor-text">ما الذي يميز أسلوبك عن غيرك؟</label>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-8">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-display">Awaiting your craft</p>
                    <button
                      type="submit"
                      disabled={sending || !form.name || !form.email || !form.portfolio_url}
                      className="inline-flex items-center gap-3 border border-border hover:border-primary bg-surface/50 hover:bg-primary px-8 py-4 rounded-full text-foreground hover:text-primary-foreground font-medium transition-all disabled:opacity-50 overflow-hidden group"
                    >
                      <span className="relative z-10">{sending ? "جاري الإرسال..." : "إرسال الطلب"}</span>
                      <Send size={16} className="relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
