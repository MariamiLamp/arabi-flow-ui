import { Sparkles, ArrowLeft, Plus, Briefcase, FileText, Eye, TrendingUp, Users, MapPin } from "lucide-react";
import { StatCard } from "./StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CompanyOverviewProps {
  companyName: string;
  onTabChange: (tab: string) => void;
}

const stats = [
  { title: "الوظائف النشطة", value: "١٢", subtitle: "وظيفة منشورة", icon: Briefcase, variant: "primary" as const, trend: { value: 8, isPositive: true } },
  { title: "إجمالي الطلبات", value: "٢٤٧", subtitle: "هذا الشهر", icon: FileText, variant: "success" as const, trend: { value: 18, isPositive: true } },
  { title: "مشاهدات الوظائف", value: "١٫٨ك", subtitle: "آخر ٣٠ يوم", icon: Eye, variant: "info" as const, trend: { value: 12, isPositive: true } },
  { title: "معدل التوظيف", value: "٢١٪", subtitle: "فوق المتوسط", icon: TrendingUp, variant: "warning" as const, trend: { value: 4, isPositive: true } },
];

const activityData = [
  { name: "الأحد", applications: 12, views: 45 },
  { name: "الاثنين", applications: 18, views: 62 },
  { name: "الثلاثاء", applications: 15, views: 58 },
  { name: "الأربعاء", applications: 24, views: 78 },
  { name: "الخميس", applications: 32, views: 95 },
  { name: "الجمعة", applications: 9, views: 28 },
  { name: "السبت", applications: 14, views: 41 },
];

const recentApplications = [
  { name: "أحمد محمد", job: "مطور واجهات أمامية", score: 95, time: "منذ ساعة" },
  { name: "سارة علي", job: "محلل بيانات", score: 88, time: "منذ ٣ ساعات" },
  { name: "محمد خالد", job: "مطور واجهات أمامية", score: 82, time: "اليوم" },
  { name: "فاطمة أحمد", job: "مدير مشاريع", score: 78, time: "أمس" },
];

const topJobs = [
  { title: "مطور واجهات أمامية", applications: 67, location: "الرياض" },
  { title: "محلل بيانات", applications: 42, location: "دبي" },
  { title: "مدير مشاريع", applications: 28, location: "جدة" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md p-3 border border-border rounded-xl shadow-xl">
        <p className="font-bold text-foreground mb-2 text-sm">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-bold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const CompanyOverview = ({ companyName, onTabChange }: CompanyOverviewProps) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "صباح الخير" : "مساء الخير";

  return (
    <div className="space-y-6" dir="rtl">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-emerald-600 via-emerald-700 to-teal-800 p-6 md:p-8 text-white opacity-0 animate-fade-up">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/20 translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white/80 text-lg">{greeting}،</span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse-soft" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{companyName}</h1>
            <p className="text-white/80 max-w-md">
              لديك ٢٤٧ طلب توظيف هذا الشهر - راجع المرشحين الجدد
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onTabChange("jobs")}
              className="px-6 py-3 rounded-lg bg-white text-emerald-700 font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              نشر وظيفة
            </button>
            <button
              onClick={() => onTabChange("applications")}
              className="px-6 py-3 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              عرض الطلبات
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} delay={i * 100} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div
          className="lg:col-span-2 card-elevated p-6 opacity-0 animate-fade-up h-[400px]"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <div className="section-header">
            <div>
              <h2 className="section-title">نشاط التوظيف</h2>
              <p className="text-xs text-muted-foreground mt-1">آخر ٧ أيام</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground font-medium">مشاهدات الوظائف</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs text-muted-foreground font-medium">طلبات جديدة</span>
              </div>
            </div>
          </div>
          <div className="w-full h-full pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dx={-10} orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="views" name="مشاهدات" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#cViews)" />
                <Area type="monotone" dataKey="applications" name="طلبات" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#cApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Jobs */}
        <div
          className="card-elevated p-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <div className="section-header">
            <h2 className="section-title">أكثر الوظائف طلباً</h2>
          </div>
          <div className="space-y-3">
            {topJobs.map((job, i) => (
              <div key={i} className="p-3 rounded-xl border border-border/50 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-sm text-foreground line-clamp-1">{job.title}</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md shrink-0">
                    {job.applications}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{job.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div
        className="card-elevated p-6 opacity-0 animate-fade-up"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        <div className="section-header">
          <h2 className="section-title">أحدث الطلبات</h2>
          <button
            onClick={() => onTabChange("applications")}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentApplications.map((app, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-emerald-500/40 hover:bg-muted/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shrink-0">
                  {app.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{app.name}</h4>
                  <p className="text-xs text-muted-foreground">{app.job}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground hidden sm:inline">{app.time}</span>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-emerald-600">{app.score}%</span>
                  <span className="text-[10px] text-muted-foreground">تطابق</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
