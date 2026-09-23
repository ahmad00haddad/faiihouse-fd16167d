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
  { name: "Marouf", image: "/faii/client-marouf.png" },
  { name: "Aljamal", image: "/faii/client-aljamal.png" },
  { name: "Azrar", image: "/faii/client-azrar.png" },
  { name: "Khan Zaid", image: "/faii/client-khanzaid.png" },
  { name: "MC", image: "/faii/client-mc.png" },
  { name: "Celebrating Al Hussein", image: "/faii/client-hussein.png" },
  { name: "Em Sherif", image: "/faii/client-emsherif.png" },
  { name: "USAID", image: "/faii/client-usaid.png" },
  { name: "Fadi", image: "/faii/client-fadi.png" },
  { name: "Bidaya", image: "/faii/client-bidaya.png" },
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
  { icon: "Film", title: "إنتاج أفلام سينمائية", desc: "نكتب وننتج ونصوّر أفلاماً روائية تحكي قصصاً من الواقع." },
  { icon: "Megaphone", title: "إعلانات سينمائية", desc: "إعلانات لشركات وعلامات تجارية بأسلوب سينمائي مبتكر." },
  { icon: "Palette", title: "تلوين سينمائي", desc: "نمنح أعمالك طابعاً لونياً يعبر عن إحساس القصة بوضوح." },
  { icon: "Camera", title: "تصوير فوتوغرافي", desc: "نوثق اللحظات بدقة متناهية لنبرز جمالية التفاصيل." },
  { icon: "Lightbulb", title: "إدارة وتطوير المحتوى", desc: "نبتكر أفكاراً جذابة لزيادة التفاعل مع الجمهور المستهدف." },
  { icon: "Music", title: "موسيقى تصويرية", desc: "نؤلف موسيقى أصلية تضفي بعداً عاطفياً على المشاهد." },
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
    kicker: "CINEMATIC PRODUCTION | EST. IRBID",
    title1: "نروي",
    titleHighlight: "الحكاية",
    tagline: "بلغة بصرية لا تُنسى",
    subtitle: "فَيّ هاوس — شركة إنتاج سينمائي من إربد. نبتكر ونصور أفلاماً، إعلانات تجارية، ووثائقيات بهوية بصرية مميزة تنبض بالحياة، لننقل رسالتك إلى العالم.",
  },
  about: {
    title: "مجموعة من الحالمين، جمعنا حب السينما.",
    body: "فَيّ هاوس شركة إنتاج سينمائي من إربد — نبتكر ونصور أعمالاً إبداعية تمزج بين الفن والقصة لتقديم محتوى بصري يجذب الجماهير. فريقنا يتكون من شباب طموح يسعى دائماً لاكتشاف زوايا جديدة في عالم الإنتاج. نحن نؤمن بأن كل قصة تستحق أن تُروى بأفضل صورة ممكنة.",
    goals: "أن نكون رواد صناعة المحتوى السينمائي في المنطقة، وأن نترك بصمة فنية واضحة تلهم الأجيال القادمة.",
    ambition: "أن نصل بأعمالنا إلى الشاشات العالمية، ونبني اسماً يتردد صداه كمرجع للإبداع الفني.",
  },
  stats: [
    { value: "+300", label: "مشروع منجز", hint: "أفلام، إعلانات، ووثائقيات نفذت بشغف" },
    { value: "+140", label: "عميل يثق بنا", hint: "محلية وإقليمية وعالمية منذ 2017" },
    { value: "+8", label: "جوائز من مهرجانات", hint: "جوائز عالمية في مهرجانات الأفلام" },
    { value: "100%", label: "شغف دائم", hint: "نعمل كل مشروع كأنه فيلمنا الأول" },
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
