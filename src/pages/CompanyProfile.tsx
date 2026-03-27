import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Briefcase,
  Clock,
  Star,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Wifi,
  GraduationCap,
  Coffee,
  Dumbbell,
  Baby,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock company data
const companiesData: Record<string, {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  founded: string;
  location: string;
  website: string;
  description: string;
  about: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  coverImage: string;
  values: string[];
  benefits: { icon: React.ElementType; label: string }[];
  techStack: string[];
  jobs: {
    id: number;
    title: string;
    location: string;
    type: string;
    postedDate: string;
    matchScore?: number;
  }[];
  gallery: string[];
}> = {
  "1": {
    id: "1",
    name: "شركة التقنية المتقدمة",
    logo: "🏢",
    industry: "تكنولوجيا المعلومات",
    size: "200-500 موظف",
    founded: "2015",
    location: "الرياض، المملكة العربية السعودية",
    website: "www.advancedtech.sa",
    description: "شركة رائدة في مجال الحلول التقنية والبرمجيات في المنطقة",
    about: "شركة التقنية المتقدمة هي واحدة من أبرز شركات التكنولوجيا في المملكة العربية السعودية. تأسست في عام 2015 بهدف تقديم حلول تقنية مبتكرة تساعد الشركات والمؤسسات على التحول الرقمي. نعمل مع أكثر من 300 عميل في مختلف القطاعات، ونفخر بفريقنا المتنوع والمبدع الذي يضم أكثر من 350 متخصصاً في مجالات البرمجة والذكاء الاصطناعي وتحليل البيانات.",
    rating: 4.5,
    reviewCount: 127,
    isVerified: true,
    coverImage: "",
    values: [
      "الابتكار والإبداع",
      "العمل الجماعي",
      "التطوير المستمر",
      "الشفافية والنزاهة",
      "التميز في الخدمة",
    ],
    benefits: [
      { icon: Wifi, label: "عمل عن بُعد مرن" },
      { icon: GraduationCap, label: "برامج تدريب وتطوير" },
      { icon: Coffee, label: "بيئة عمل محفزة" },
      { icon: Dumbbell, label: "اشتراك نادي رياضي" },
      { icon: Baby, label: "إجازة أبوة/أمومة مدفوعة" },
      { icon: Plane, label: "تذاكر سفر سنوية" },
    ],
    techStack: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
    jobs: [
      { id: 1, title: "مطور واجهات أمامية أول", location: "الرياض", type: "دوام كامل", postedDate: "منذ 3 أيام", matchScore: 95 },
      { id: 2, title: "مهندس بيانات", location: "عن بُعد", type: "دوام كامل", postedDate: "منذ أسبوع", matchScore: 78 },
      { id: 3, title: "مدير مشاريع تقنية", location: "الرياض", type: "دوام كامل", postedDate: "منذ أسبوعين", matchScore: 65 },
      { id: 4, title: "مصمم تجربة مستخدم", location: "جدة", type: "دوام جزئي", postedDate: "منذ 5 أيام", matchScore: 82 },
    ],
    gallery: [],
  },
  "2": {
    id: "2",
    name: "مؤسسة الابتكار الرقمي",
    logo: "💡",
    industry: "الخدمات الرقمية",
    size: "50-200 موظف",
    founded: "2018",
    location: "جدة، المملكة العربية السعودية",
    website: "www.digitalinnovation.sa",
    description: "نبتكر حلولاً رقمية تُحدث فرقاً حقيقياً في حياة الناس",
    about: "مؤسسة الابتكار الرقمي هي شركة ناشئة سريعة النمو تركز على تطوير التطبيقات والمنصات الرقمية. نؤمن بقوة التكنولوجيا في تحسين حياة الأفراد والمجتمعات.",
    rating: 4.2,
    reviewCount: 64,
    isVerified: true,
    coverImage: "",
    values: ["الابتكار", "السرعة", "التأثير الإيجابي", "التعلم المستمر"],
    benefits: [
      { icon: Wifi, label: "عمل عن بُعد بالكامل" },
      { icon: GraduationCap, label: "ميزانية تعلم سنوية" },
      { icon: Coffee, label: "ساعات عمل مرنة" },
    ],
    techStack: ["Vue.js", "Go", "GCP", "MongoDB"],
    jobs: [
      { id: 5, title: "مهندس برمجيات", location: "عن بُعد", type: "عن بُعد", postedDate: "منذ يومين", matchScore: 88 },
      { id: 6, title: "محلل بيانات", location: "جدة", type: "دوام كامل", postedDate: "منذ أسبوع" },
    ],
    gallery: [],
  },
};

const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const company = companiesData[id || "1"];

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center space-y-4">
          <Building2 className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">الشركة غير موجودة</h2>
          <Link to="/jobs">
            <Button>العودة للوظائف</Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = (
    <div className="space-y-6" dir="rtl">
      {/* Cover & Company Header */}
      <div className="relative">
        <div className="h-48 md:h-56 rounded-2xl bg-gradient-to-l from-secondary via-secondary-light to-primary/80 overflow-hidden" />

        <div className="relative -mt-16 px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-5">
            {/* Logo */}
            <div className="w-28 h-28 rounded-2xl bg-card border-4 border-background shadow-xl flex items-center justify-center text-5xl shrink-0">
              {company.logo}
            </div>

            {/* Info */}
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{company.name}</h1>
                {company.isVerified && (
                  <CheckCircle2 className="w-6 h-6 text-primary fill-primary/20" />
                )}
              </div>
              <p className="text-muted-foreground mt-1">{company.description}</p>
              <div className="flex items-center gap-4 mt-2 flex-wrap text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{company.location}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{company.size}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />تأسست {company.founded}</span>
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{company.website}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pb-1">
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                متابعة الشركة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Summary */}
      <Card>
        <CardContent className="py-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-5 h-5",
                  star <= Math.floor(company.rating)
                    ? "text-warning fill-warning"
                    : star - 0.5 <= company.rating
                    ? "text-warning fill-warning/50"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <span className="text-lg font-bold text-foreground">{company.rating}</span>
          <span className="text-sm text-muted-foreground">({company.reviewCount} تقييم)</span>
          <Badge variant="secondary" className="mr-auto">{company.industry}</Badge>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about" dir="rtl">
        <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">نبذة عن الشركة</TabsTrigger>
          <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            الوظائف المتاحة
            <Badge variant="secondary" className="mr-2 text-xs">{company.jobs.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="culture" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">بيئة العمل</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">عن الشركة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{company.about}</p>
            </CardContent>
          </Card>

          {company.techStack.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">التقنيات المستخدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="px-3 py-1.5 text-sm border-primary/30 text-primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4 mt-6">
          {company.jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow group cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.type}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.postedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {job.matchScore && (
                      <div className={cn(
                        "text-sm font-bold px-3 py-1.5 rounded-full",
                        job.matchScore >= 80
                          ? "bg-success/10 text-success"
                          : job.matchScore >= 60
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {job.matchScore}% تطابق
                      </div>
                    )}
                    <Button size="sm">التقديم</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">قيمنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {company.values.map((value, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">المزايا والفوائد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
};

export default CompanyProfile;
