import { useParams, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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
  CheckCircle2,
  Mail,
  Phone,
  Send,
  UserPlus,
  MessageSquare,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GuestLayout } from "@/components/layout/GuestLayout";

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
  email: string;
  phone: string;
  description: string;
  about: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  jobs: {
    id: number;
    title: string;
    location: string;
    type: string;
    postedDate: string;
    matchScore?: number;
    salary?: string;
  }[];
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
    email: "hr@advancedtech.sa",
    phone: "+966 50 123 4567",
    description: "شركة رائدة في مجال الحلول التقنية والبرمجيات في المنطقة",
    about: "شركة التقنية المتقدمة هي واحدة من أبرز شركات التكنولوجيا في المملكة العربية السعودية. تأسست في عام 2015 بهدف تقديم حلول تقنية مبتكرة تساعد الشركات والمؤسسات على التحول الرقمي. نعمل مع أكثر من 300 عميل في مختلف القطاعات، ونفخر بفريقنا المتنوع والمبدع الذي يضم أكثر من 350 متخصصاً في مجالات البرمجة والذكاء الاصطناعي وتحليل البيانات.",
    rating: 4.5,
    reviewCount: 127,
    isVerified: true,
    jobs: [
      { id: 1, title: "مطور واجهات أمامية أول", location: "الرياض", type: "دوام كامل", postedDate: "منذ 3 أيام", matchScore: 95, salary: "15,000 - 25,000 ر.س" },
      { id: 2, title: "مهندس بيانات", location: "عن بُعد", type: "دوام كامل", postedDate: "منذ أسبوع", matchScore: 78, salary: "18,000 - 28,000 ر.س" },
      { id: 3, title: "مدير مشاريع تقنية", location: "الرياض", type: "دوام كامل", postedDate: "منذ أسبوعين", matchScore: 65, salary: "20,000 - 35,000 ر.س" },
      { id: 4, title: "مصمم تجربة مستخدم", location: "جدة", type: "دوام جزئي", postedDate: "منذ 5 أيام", matchScore: 82, salary: "12,000 - 18,000 ر.س" },
    ],
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
    email: "info@digitalinnovation.sa",
    phone: "+966 55 987 6543",
    description: "نبتكر حلولاً رقمية تُحدث فرقاً حقيقياً في حياة الناس",
    about: "مؤسسة الابتكار الرقمي هي شركة ناشئة سريعة النمو تركز على تطوير التطبيقات والمنصات الرقمية. نؤمن بقوة التكنولوجيا في تحسين حياة الأفراد والمجتمعات. فريقنا يضم نخبة من المطورين والمصممين الذين يعملون بشغف لإنشاء منتجات رقمية مبتكرة.",
    rating: 4.2,
    reviewCount: 64,
    isVerified: true,
    jobs: [
      { id: 5, title: "مهندس برمجيات", location: "عن بُعد", type: "عن بُعد", postedDate: "منذ يومين", matchScore: 88, salary: "14,000 - 22,000 ر.س" },
      { id: 6, title: "محلل بيانات", location: "جدة", type: "دوام كامل", postedDate: "منذ أسبوع", salary: "12,000 - 18,000 ر.س" },
    ],
  },
};

const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("view") || "jobseeker"; // "jobseeker" | "hr"
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

  const isHR = viewType === "hr";

  return (
    <GuestLayout>
      <div className="max-w-5xl mx-auto space-y-6 py-6 px-4" dir="rtl">
        {/* Cover & Company Header */}
        <div className="relative">
          <div className="h-44 md:h-52 rounded-2xl bg-gradient-to-l from-primary/80 via-primary/60 to-secondary/50 overflow-hidden" />

          <div className="relative -mt-14 px-6">
            <div className="flex flex-col md:flex-row md:items-end gap-5">
              {/* Logo */}
              <div className="w-24 h-24 rounded-2xl bg-card border-4 border-background shadow-xl flex items-center justify-center text-4xl shrink-0">
                {company.logo}
              </div>

              {/* Info */}
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{company.name}</h1>
                  {company.isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-primary fill-primary/20" />
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{company.description}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{company.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{company.size}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />تأسست {company.founded}</span>
                </div>
              </div>

              {/* Actions - Different based on viewer type */}
              <div className="flex items-center gap-2 pb-1 flex-wrap">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
                {isHR ? (
                  <Button className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    تواصل مع الشركة
                  </Button>
                ) : (
                  <Button className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    متابعة الشركة
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Industry Badge */}
        <Card>
          <CardContent className="py-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-5 h-5",
                    star <= Math.floor(company.rating)
                      ? "text-primary fill-primary"
                      : star - 0.5 <= company.rating
                      ? "text-primary fill-primary/50"
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
            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              نبذة عن الشركة
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              الوظائف المتاحة
              <Badge variant="secondary" className="mr-2 text-xs">{company.jobs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              معلومات التواصل
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  عن الشركة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{company.about}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{company.jobs.length}</p>
                  <p className="text-xs text-muted-foreground">وظيفة متاحة</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{company.size.split("-")[0]}+</p>
                  <p className="text-xs text-muted-foreground">موظف</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{company.rating}</p>
                  <p className="text-xs text-muted-foreground">تقييم</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{company.founded}</p>
                  <p className="text-xs text-muted-foreground">سنة التأسيس</p>
                </CardContent>
              </Card>
            </div>
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
                        {job.salary && (
                          <span className="text-primary font-medium">{job.salary}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Job seeker sees match score + apply button */}
                      {!isHR && job.matchScore && (
                        <div className={cn(
                          "text-sm font-bold px-3 py-1.5 rounded-full",
                          job.matchScore >= 80
                            ? "bg-primary/10 text-primary"
                            : job.matchScore >= 60
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {job.matchScore}% تطابق
                        </div>
                      )}
                      {isHR ? (
                        <Button size="sm" variant="outline" className="gap-1">
                          <ExternalLink className="w-3.5 h-3.5" />
                          عرض التفاصيل
                        </Button>
                      ) : (
                        <Button size="sm" className="gap-1">
                          <Send className="w-3.5 h-3.5" />
                          التقديم
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {company.jobs.length === 0 && (
              <Card>
                <CardContent className="p-10 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">لا توجد وظائف متاحة حالياً</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">الموقع الإلكتروني</p>
                      <p className="text-sm font-medium text-foreground" dir="ltr">{company.website}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                      <p className="text-sm font-medium text-foreground" dir="ltr">{company.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">رقم الهاتف</p>
                      <p className="text-sm font-medium text-foreground" dir="ltr">{company.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">الموقع</p>
                      <p className="text-sm font-medium text-foreground">{company.location}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Different CTA based on viewer */}
                <div className="flex justify-center pt-2">
                  {isHR ? (
                    <Button className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      إرسال رسالة للشركة
                    </Button>
                  ) : (
                    <Button className="gap-2">
                      <FileText className="w-4 h-4" />
                      إرسال سيرتك الذاتية
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </GuestLayout>
  );
};

export default CompanyProfile;
