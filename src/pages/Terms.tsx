import { GuestLayout } from "@/components/layout/GuestLayout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Building2,
  ShieldCheck,
  UserCircle,
  PenLine,
  CreditCard,
  Sparkles,
  Lock,
  Globe,
  Megaphone,
  Scale,
  XCircle,
  Gavel,
  Landmark,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Introduction",
    body: (
      <p>
        Welcome to <span className="font-semibold text-foreground">Career Book</span>{" "}
        ("Company", "we", "our", "us"), a recruiting SaaS platform accessible at{" "}
        <a
          href="https://careerbookpro.com"
          className="text-primary hover:underline font-medium"
        >
          careerbookpro.com
        </a>
        . By accessing or using our services, you agree to be bound by these Terms and
        Conditions.
      </p>
    ),
  },
  {
    icon: Building2,
    title: "2. Company Information",
    body: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Career Book LLC</p>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          <span>53 Capital Mall, Fifth Settlement, New Cairo, Cairo, Egypt</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4 text-primary" />
          <a href="mailto:info@careerbookpro.com" className="hover:text-primary">
            info@careerbookpro.com
          </a>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground" dir="ltr">
          <Phone className="w-4 h-4 text-primary" />
          <a href="tel:+201287444866" className="hover:text-primary">
            +20 128 744 4866
          </a>
        </div>
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: "3. Use of Services",
    body: (
      <div className="space-y-3">
        <p>You agree to use our platform only for lawful purposes. You must not:</p>
        <ul className="space-y-2">
          {[
            "Use the service for illegal activities",
            "Scrape, copy, or extract data without permission",
            "Abuse, harass, or harm other users",
            "Attempt to reverse engineer or disrupt the platform",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    icon: UserCircle,
    title: "4. User Accounts",
    body: (
      <p>
        Users may create accounts and are responsible for maintaining the confidentiality
        of their credentials. We reserve the right to suspend or terminate accounts at
        our discretion, especially in cases of violation of these Terms.
      </p>
    ),
  },
  {
    icon: PenLine,
    title: "5. User Content",
    body: (
      <p>
        Users may post content such as job listings or profiles. You are solely
        responsible for the content you submit and must ensure it does not violate any
        laws or rights.
      </p>
    ),
  },
  {
    icon: CreditCard,
    title: "6. Payments & Subscriptions",
    body: (
      <p>
        We offer both free and paid plans. Payments are processed via secure third-party
        providers (e.g., card payments, Apple Pay). Refunds are handled on a case-by-case
        basis at our sole discretion.
      </p>
    ),
  },
  {
    icon: Sparkles,
    title: "7. AI Disclaimer",
    body: (
      <p>
        Our platform may include AI-powered features. These tools may generate inaccurate
        or incomplete results. You acknowledge that any decisions made based on AI
        outputs are your sole responsibility.
      </p>
    ),
  },
  {
    icon: Lock,
    title: "8. Data Protection & Privacy",
    body: (
      <p>
        We collect and process personal data in accordance with our Privacy Policy. We
        use cookies and similar technologies to improve user experience. For users in
        applicable regions, we aim to comply with GDPR requirements regarding data
        protection and user rights.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "9. Third-Party Services",
    body: (
      <p>
        We may use third-party services such as Google, Meta, and payment providers. We
        are not responsible for their content, policies, or practices.
      </p>
    ),
  },
  {
    icon: Megaphone,
    title: "10. Affiliate & Marketing Disclaimer",
    body: (
      <p>
        We may engage in affiliate marketing or promotional activities. We may earn
        commissions from certain links or partnerships.
      </p>
    ),
  },
  {
    icon: Scale,
    title: "11. Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, Career Book shall not be liable for any
        indirect, incidental, or consequential damages arising from your use of the
        platform.
      </p>
    ),
  },
  {
    icon: XCircle,
    title: "12. Termination",
    body: (
      <p>
        We reserve the right to terminate or suspend access to our services at any time
        without prior notice.
      </p>
    ),
  },
  {
    icon: Landmark,
    title: "13. Governing Law",
    body: (
      <p>
        These Terms are governed by and construed in accordance with the laws of Egypt.
      </p>
    ),
  },
  {
    icon: Gavel,
    title: "14. Arbitration",
    body: (
      <p>
        Any disputes arising out of or related to these Terms shall be resolved through
        arbitration in Egypt, in accordance with applicable laws.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "15. Changes to Terms",
    body: (
      <p>
        We reserve the right to update or modify these Terms at any time. Continued use
        of the platform constitutes acceptance of the updated Terms.
      </p>
    ),
  },
];

const Terms = () => {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <GuestLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.15), transparent 50%), radial-gradient(circle at 80% 60%, hsl(var(--secondary) / 0.15), transparent 50%)",
          }}
        />
        <div className="container mx-auto relative px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              <span>Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Terms <span className="text-primary">&amp;</span> Conditions
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Please read these terms carefully before using Career Book. They govern
              your access to and use of our recruiting platform and services.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Effective Date:</span>{" "}
              {effectiveDate}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10 max-w-6xl mx-auto">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Card className="p-5 bg-card/60 backdrop-blur border-border/60">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((s, i) => (
                    <a
                      key={i}
                      href={`#section-${i + 1}`}
                      className="block text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md px-2 py-1.5 transition-colors"
                    >
                      {s.title}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="block text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md px-2 py-1.5 transition-colors"
                  >
                    16. Contact Us
                  </a>
                </nav>
              </Card>
            </div>
          </aside>

          {/* Body */}
          <article className="space-y-6">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <Card
                  key={i}
                  id={`section-${i + 1}`}
                  className="p-6 md:p-8 bg-card border-border/60 hover:border-primary/30 transition-colors scroll-mt-28"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {s.title}
                      </h2>
                      <Separator className="mb-4" />
                      <div className="text-muted-foreground leading-relaxed">
                        {s.body}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Contact Card */}
            <Card
              id="contact"
              className="p-8 md:p-10 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 scroll-mt-28"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    16. Contact Us
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    We're here to help. Reach out anytime.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <a
                  href="mailto:info@careerbookpro.com"
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-border/60 hover:border-primary/40 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground text-sm break-all">
                      info@careerbookpro.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+201287444866"
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-border/60 hover:border-primary/40 transition-colors"
                  dir="ltr"
                >
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground text-sm">
                      +20 128 744 4866
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-border/60">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="font-medium text-foreground text-sm">
                      53 Capital Mall, Fifth Settlement, New Cairo, Egypt
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </article>
        </div>
      </section>
    </GuestLayout>
  );
};

export default Terms;
