import { Sparkles, ArrowLeft, Users, Building2, UserCheck, DollarSign, TrendingUp, Activity } from "lucide-react";
import { StatCard } from "./StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface AdminOverviewProps {
  onTabChange: (tab: string) => void;
}

const stats = [
  { title: "إجمالي المستخدمين", value: "١٢٫٤ك", subtitle: "باحثين عن عمل", icon: Users, variant: "primary" as const, trend: { value: 14, isPositive: true } },
  { title: "الشركات المسجلة", value: "٤٨٧", subtitle: "شركة نشطة", icon: Building2, variant: "success" as const, trend: { value: 8, isPositive: true } },
  { title: "موظفي HR", value: "٩٢٣", subtitle: "حساب نشط", icon: UserCheck, variant: "info" as const, trend: { value: 11, isPositive: true } },
  { title: "إيرادات الشهر", value: "٦٥ك", subtitle: "ريال سعودي", icon: DollarSign, variant: "warning" as const, trend: { value: 22, isPositive: true } },
];

const growthData = [
  { name: "يناير", users: 8200, revenue: 45 },
  { name: "فبراير", users: 9100, revenue: 52 },
  { name: "مارس", users: 9800, revenue: 48 },
  { name: "أبريل", users: 10500, revenue: 61 },
  { name: "مايو", users: 11400, revenue: 58 },
  { name: "يونيو", users: 12400, revenue: 65 },
];

const revenueByType = [
  { name: "باحثين", value: 35, fill: "#3b82f6" },
  { name: "شركات", value: 25, fill: "#10b981" },
  { name: "HR", value: 15, fill: "#a855f7" },
  { name: "إعلانات", value: 12, fill: "#f97316" },
  { name: "قوالب", value: 8, fill: "#f59e0b" },
];

const recentActivity = [
  { type: "user", text: "انضم مستخدم جديد: أحمد محمد", time: "منذ ٥ دقائق", color: "bg-blue-500" },
  { type: "company", text: "تم تحقق شركة: التقنية المتقدمة", time: "منذ ٢٠ دقيقة", color: "bg-emerald-500" },
  { type: "payment", text: "دفعة جديدة: ٢٫٥٠٠ ر.س - إعلان", time: "منذ ساعة", color: "bg-amber-500" },
  { type: "hr", text: "اشتراك HR جديد: نورة السعيد", time: "منذ ٢ ساعة", color: "bg-purple-500" },
  { type: "user", text: "ترقية اشتراك: سارة علي (احترافي)", time: "اليوم", color: "bg-blue-500" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md p-3 border border-border rounded-xl shadow-xl">
        <p className="font-bold text-foreground mb-2 text-sm">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-bold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AdminOverview = ({ onTabChange }: AdminOverviewProps) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "صباح الخير" : "مساء الخير";

  return (
    <div className="space-y-6" dir="rtl">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-purple-600 via-purple-700 to-indigo-800 p-6 md:p-8 text-white opacity-0 animate-fade-up">
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">لوحة المدير</h1>
            <p className="text-white/80 max-w-md">
              نمو ١٤٪ في عدد المستخدمين هذا الشهر - أداء ممتاز للمنصة
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onTabChange("users")}
              className="px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Users className="w-4 h-4" />
              إدارة المستخدمين
            </button>
            <button
              onClick={() => onTabChange("finance")}
              className="px-6 py-3 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              التقارير المالية
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div
          className="lg:col-span-2 card-elevated p-6 opacity-0 animate-fade-up h-[400px]"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <div className="section-header">
            <div>
              <h2 className="section-title">نمو المنصة</h2>
              <p className="text-xs text-muted-foreground mt-1">آخر ٦ أشهر</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-xs text-muted-foreground font-medium">المستخدمين</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground font-medium">الإيرادات (ألف)</span>
              </div>
            </div>
          </div>
          <div className="w-full h-full pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="aUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="aRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dx={-10} orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="users" name="المستخدمين" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#aUsers)" />
                <Area type="monotone" dataKey="revenue" name="الإيرادات" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#aRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Type */}
        <div
          className="card-elevated p-6 opacity-0 animate-fade-up h-[400px]"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <div className="section-header">
            <div>
              <h2 className="section-title">توزيع الإيرادات</h2>
              <p className="text-xs text-muted-foreground mt-1">حسب النوع</p>
            </div>
          </div>
          <div className="w-full h-full pb-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByType} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted))" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={60} orientation="right" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {revenueByType.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="card-elevated p-6 opacity-0 animate-fade-up"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        <div className="section-header">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <h2 className="section-title">آخر النشاطات</h2>
          </div>
        </div>
        <div className="space-y-3">
          {recentActivity.map((act, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-purple-500/40 hover:bg-muted/30 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${act.color}`} />
                <p className="text-sm text-foreground font-medium">{act.text}</p>
              </div>
              <span className="text-xs text-muted-foreground">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
