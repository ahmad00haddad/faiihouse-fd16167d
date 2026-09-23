export type Client = { name: string; image: string };
export const clients: Client[] = [
  { name: "Mouje", image: "/faii/client-mouje.webp" },
  { name: "Salwa", image: "/faii/client-salwa.webp" },
  { name: "Zawaya", image: "/faii/client-zawaya.webp" },
  { name: "Abadelah", image: "/faii/client-abadelah.webp" },
  { name: "Tabarak", image: "/faii/client-tabarak.webp" },
  { name: "Namani", image: "/faii/client-namani.webp" },
  { name: "Cannella", image: "/faii/client-cannella.webp" },
  { name: "Acai", image: "/faii/client-acai.webp" },
  { name: "Fa", image: "/faii/client-fa.webp" },
  { name: "Client", image: "/faii/client1.webp" },
  { name: "Marouf", image: "/faii/client-marouf.webp" },
  { name: "Aljamal", image: "/faii/client-aljamal.webp" },
  { name: "Azrar", image: "/faii/client-azrar.webp" },
  { name: "Khan Zaid", image: "/faii/client-khanzaid.webp" },
  { name: "MC", image: "/faii/client-mc.webp" },
  { name: "Celebrating Al Hussein", image: "/faii/client-hussein.webp" },
  { name: "Em Sherif", image: "/faii/client-emsherif.webp" },
  { name: "USAID", image: "/faii/client-usaid.webp" },
  { name: "Fadi", image: "/faii/client-fadi.webp" },
  { name: "Bidaya", image: "/faii/client-bidaya.webp" },
];

export type PortCategory = "all" | "film" | "documentary" | "ads";

export type PortfolioItem = {
  image: string;
  title: string;
  category: Exclude<PortCategory, "all">;
  behance?: string;
};

export const portfolio: PortfolioItem[] = [
  { image: "/faii/port-film1.webp", title: "Short Film - Frame 1", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-film2.webp", title: "Short Film - Frame 2", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-film3.webp", title: "Short Film - Frame 3", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-1stfilm.webp", title: "First Film", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/team-masri.webp", title: "Masri", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-kanana.webp", title: "Kanana", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-omar.webp", title: "Omar", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-aser.webp", title: "Aser", category: "film", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-doc1.webp", title: "Khan Zaid", category: "documentary", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-doc2.webp", title: "Documentary Still", category: "documentary", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-doc3.webp", title: "Documentary Story", category: "documentary", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-ad1.webp", title: "Brand Ad 01", category: "ads", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-ad2.webp", title: "Brand Ad 02", category: "ads", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-ad3.webp", title: "Brand Ad 03", category: "ads", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-ad4.webp", title: "Brand Ad 04", category: "ads", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-ad5.webp", title: "Brand Ad 05", category: "ads", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-acai.webp", title: "Acai Campaign", category: "ads", behance: "https://www.behance.net/faiihouse" },
  { image: "/faii/port-ezwiti.webp", title: "Ezwiti", category: "ads", behance: "https://www.behance.net/faiihouse" },
];

export const services = [
  { icon: "Film", title: "أفلام سينمائية", desc: "بنعيش مع القصة من أول سطر عالورق، لحد ما تطلع عالشاشة. بنصنع أفلام مستقلة بتحكي عنا وعن مجتمعنا." },
  { icon: "Megaphone", title: "إعلانات غير تقليدية", desc: "ما بنعمل إعلانات تجارية بتنعملها Skip. بنصنع قصة لعلامتك التجارية بتعلق براس الناس وبتشبه هويتهم." },
  { icon: "Palette", title: "التلوين السينمائي", desc: "التلوين عندنا مو مجرد فلتر جاهز، هو إحساس بنبنيه لقطة بلقطة ليعطي اللقطة روحها." },
  { icon: "Camera", title: "التصوير والتوثيق", desc: "بنوثق اللحظة بعفويتها. بننزل عالشارع وبنلقط التفاصيل اللي بتميزك، بدون تزييف أو تصنع." },
  { icon: "Lightbulb", title: "صناعة الأفكار", desc: "بنكسر القوالب الجاهزة لنطلع بأفكار مجنونة، بتشبه طموح فريقنا وطموح عملائنا." },
  { icon: "Music", title: "موسيقى وتصميم صوتي", desc: "نص التجربة البصرية هي الصوت. بنركب موسيقى ومؤثرات بتخلي المشاهد يعيش اللحظة." },
];

export const SHOWREEL_URL = "https://www.youtube.com/watch?v=yB-VOx0gS54";

export type SiteContent = {
  hero: { kicker: string; title1: string; titleHighlight: string; tagline: string; subtitle: string };
  about: { title: string; body: string; goals: string; ambition: string };
  stats: { value: string; label: string; hint?: string }[];
  contact: { phone: string; email: string; address: string; instagram: string; facebook: string; linkedin: string; behance: string };
  showreelUrl: string;
  services: { title: string; desc: string }[];
  portfolio: { image: string; title: string; category: "film" | "documentary" | "ads"; behance: string }[];
  clients: { name: string; image: string }[];
};

export const defaultContent: SiteContent = {
  hero: {
    kicker: "مساحة إبداعية مستقلة | إربد",
    title1: "ما بنصنع محتوى..",
    titleHighlight: "بنحكي حكاية.",
    tagline: "بلغة بصرية بتعلق بالبال.",
    subtitle: "فَيّ هاوس مو مجرد شركة إنتاج، إحنا فريق شبابي جمعنا الشغف والسينما. أفكارنا مجنونة، عدساتنا بتشوف التفاصيل اللي ما بتنطاق، وبنصنع فيديوهات بتشبهنا وبتشبهكم.",
  },
  about: {
    title: "مجموعة حالمين، جمعتنا الكاميرا.",
    body: "ما بنحب نسمي حالنا 'شركة'، لأننا أقرب لعيلة أو ورشة فنية. فَيّ هاوس هي مساحة خلقتها مجموعة شباب، جمعنا حبنا للصورة وللسينما. ما عندنا هرميات معقدة ولا بروتوكولات مملة، عندنا كاميرات، أفكار، وطاقة ما بتخلص. بنآمن إنه الشغف هو اللي بيصنع الفرق، وإنه كل قصة -مهما كانت بسيطة- بتقدر تلمس القلب إذا انحكت صح ومن ناس بتشبهها.",
    goals: "هدفنا؟ نعمل فن نكون فخورين فيه. ما بنطمح نكون 'أكبر شركة في العالم'، بس بنطمح نكون الأصدق. بدنا كل حدا بيشوف شغلنا يحس بطاقة حقيقية ورا هالشاشة.",
    ambition: "طموحنا مجنون بس بسيط؛ نترك بصمة بصرية ما بتشبه حدا. بدنا نرفع مستوى الإنتاج المحلي، ونثبت للكل إنه الشباب المستقل قادر يصنع سينما وإعلانات تنافس أي مكان بالعالم.",
  },
  stats: [
    { value: "+300", label: "مشروع انشغل بحب", hint: "أفلام، إعلانات، ووثائقيات" },
    { value: "+140", label: "شريك نجاح", hint: "وثقوا برؤيتنا من 2017" },
    { value: "+8", label: "جوائز دولية", hint: "لأفلام مستقلة لفتت العالم" },
    { value: "100%", label: "شغف دائم", hint: "بنشتغل كل مشروع كأنه أول مشروع" },
  ],
  contact: {
    phone: "+962 79 925 6345",
    email: "faii.house.jo@gmail.com",
    address: "الأردن — إربد",
    instagram: "https://www.instagram.com/faii.house/",
    facebook: "https://www.facebook.com/faii.house.jo",
    linkedin: "https://www.linkedin.com/company/faiihouse/",
    behance: "https://www.behance.net/faiihouse",
  },
  showreelUrl: SHOWREEL_URL,
  services,
  portfolio: portfolio.map((p) => ({ image: p.image, title: p.title, category: p.category, behance: p.behance ?? "https://www.behance.net/faiihouse" })),
  clients,
};
