import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Target,
  Eye,
  Lightbulb,
  ShieldCheck,
  Compass,
  TrendingUp,
  Users,
  GraduationCap,
  Megaphone,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  User,
  BookOpen as BookIcon,
} from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Clarity", desc: "We simplify complex problems in career, talent, and marketing. Complexity is our work, not the client's." },
  { icon: Sparkles, title: "Intelligence", desc: "Every service, insight, and piece of content is grounded in real market observation — not generic advice." },
  { icon: ShieldCheck, title: "Honesty", desc: "We never oversell. We state clearly what we do, what it costs, and what results are realistic." },
  { icon: Compass, title: "Precision", desc: "Each business unit is focused and specific. We do not try to be everything to everyone." },
  { icon: TrendingUp, title: "Impact", desc: "Every engagement must create a measurable outcome. Effort without results is not enough." },
];

const units = [
  {
    tag: "Unit 01",
    name: "Career Book Ecosystem",
    audience: "For Companies & Individuals",
    tagline: "Build Systems. Not Just Teams.",
    icon: Users,
    accent: "from-primary/90 to-primary/60",
  },
  {
    tag: "Unit 02",
    name: "Career Book Academy",
    audience: "For Individuals & Trainers",
    tagline: "Learn How the Market Actually Works.",
    icon: GraduationCap,
    accent: "from-secondary/90 to-secondary/60",
  },
  {
    tag: "Unit 03",
    name: "Career Book Marketing",
    audience: "For Different Companies",
    tagline: "Reach in a Strategic Way. Not Guesswork.",
    icon: Megaphone,
    accent: "from-accent/90 to-accent/60",
  },
];

const notList = [
  "Not only a recruitment agency — we do not place candidates.",
  "Not a generic management consultancy — we specialize in talent and people systems only.",
  "Not a training provider — training is a separate business unit (Academy).",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="h-20 border-b border-border/40 fixed top-0 w-full bg-background/95 backdrop-blur-xl z-50 transition-all duration-500 shadow-sm">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group hover:shadow-primary/30 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="hidden sm:block" dir="ltr">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-primary font-extralight">Career</span>
                <span className="text-foreground font-black">Book</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                • منصة التوظيف الذكية •
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              الرئيسية
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="font-medium">
                <User className="w-4 h-4 ml-2" />
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="font-medium shadow-lg shadow-primary/20">
                <Target className="w-4 h-4 ml-2" />
                انضم إلينا
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container relative mx-auto px-6 py-20 md:py-28">
          <Badge variant="secondary" className="mb-6 gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            About CareerBook
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            Career Book.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Built for Scale.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Career Book helps companies build talent systems, professionals build intentional
            careers, trainers build better programs, and brands reach their audiences — through
            intelligence, not guesswork.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-primary/20 hover:shadow-elevated transition-all">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To build the leading career and smart intelligence platform in the MENA region —
                where professionals grow intentionally, companies build systems that work, and the
                training market becomes more structured and impactful.
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:shadow-elevated transition-all">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Career Book exists to serve three distinct markets through three focused business
                units — each independent, each solving a real and specific problem.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What makes us different */}
      <section className="bg-muted/30 border-y border-border/40 py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <Badge variant="outline" className="mb-4">What Makes Us Different</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three specialized units. One commitment to intelligence.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are not a generalist consulting firm. We are not a mass-market training platform.
              We are not a typical marketing agency. We are three specialized units that understand
              one thing deeply: how professionals, companies, and smart markets actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {units.map((u) => (
              <Card key={u.tag} className="group overflow-hidden border-border/60 hover:border-primary/40 transition-all hover:-translate-y-1">
                <div className={`h-1.5 bg-gradient-to-r ${u.accent}`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">{u.tag}</Badge>
                    <u.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{u.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                    {u.audience}
                  </p>
                  <p className="text-sm font-medium text-foreground/80 italic">
                    "{u.tagline}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Core Values</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What we stand for</h2>
          <p className="text-muted-foreground">
            Five principles that shape every decision, product, and conversation at Career Book.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => (
            <Card key={v.title} className="group hover:shadow-elevated hover:-translate-y-1 transition-all">
              <CardContent className="p-6">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What we are NOT */}
      <section className="container mx-auto px-6 pb-16 md:pb-20">
        <Card className="bg-gradient-to-br from-sidebar to-sidebar/90 border-0 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-5 hover:bg-primary/20">
              Setting expectations
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              What Career Book Ecosystem is{" "}
              <span className="underline decoration-primary decoration-4 underline-offset-4">NOT</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl">
              Honesty is one of our core values. Here's what we are not, so you know exactly what
              we are.
            </p>
            <div className="space-y-3">
              {notList.map((item) => (
                <div key={item} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)] opacity-20" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Ready to build with intelligence?
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
              Whether you're hiring, learning, or growing your brand — let's start a conversation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="gap-2">
                  Contact us
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white">
                  Explore jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}
