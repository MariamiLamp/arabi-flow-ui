import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Building2,
  UserCheck,
  Plus,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Layers,
  Sparkles,
  Eye,
} from "lucide-react";

// Types
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  targetRole: "job_seeker" | "company" | "hr";
  isActive: boolean;
  createdAt: string;
}

interface PlanVersion {
  id: string;
  planId: string;
  price: number;
  currency: string;
  billingPeriod: "monthly" | "yearly";
  versionNumber: number;
  isActive: boolean;
}

interface Feature {
  id: string;
  name: string;
  key: string;
  description: string;
}

interface PlanFeature {
  id: string;
  planVersionId: string;
  featureId: string;
  limitValue: number | null;
}

// Mock Data
const mockPlans: SubscriptionPlan[] = [
  { id: "p1", name: "مجاني", description: "للباحثين عن عمل المبتدئين", targetRole: "job_seeker", isActive: true, createdAt: "2024-01-01" },
  { id: "p2", name: "احترافي", description: "للباحثين الجادين عن فرص مميزة", targetRole: "job_seeker", isActive: true, createdAt: "2024-01-01" },
  { id: "p3", name: "مميز", description: "للوصول لأفضل الفرص", targetRole: "job_seeker", isActive: true, createdAt: "2024-01-01" },
  { id: "p4", name: "شركات", description: "للشركات المتوسطة", targetRole: "company", isActive: true, createdAt: "2024-01-01" },
  { id: "p5", name: "شركات+", description: "للشركات الكبرى", targetRole: "company", isActive: true, createdAt: "2024-01-01" },
  { id: "p6", name: "HR الأساسية", description: "لمسؤولي التوظيف", targetRole: "hr", isActive: true, createdAt: "2024-01-01" },
  { id: "p7", name: "HR الاحترافية", description: "لمحترفي التوظيف", targetRole: "hr", isActive: true, createdAt: "2024-01-01" },
];

const mockVersions: PlanVersion[] = [
  { id: "v1", planId: "p1", price: 0, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
  { id: "v2", planId: "p2", price: 49, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
  { id: "v3", planId: "p2", price: 470, currency: "EGP", billingPeriod: "yearly", versionNumber: 2, isActive: true },
  { id: "v4", planId: "p3", price: 99, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
  { id: "v5", planId: "p4", price: 299, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
  { id: "v6", planId: "p5", price: 599, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
  { id: "v7", planId: "p6", price: 199, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
  { id: "v8", planId: "p7", price: 450, currency: "EGP", billingPeriod: "monthly", versionNumber: 1, isActive: true },
];

const mockFeatures: Feature[] = [
  { id: "f1", name: "فحص السيرة الذاتية", key: "cv_check", description: "فحص وتقييم السيرة الذاتية" },
  { id: "f2", name: "طلبات التوظيف", key: "job_applications", description: "التقديم على الوظائف" },
  { id: "f3", name: "خطابات التقديم AI", key: "ai_cover_letter", description: "توليد خطابات التقديم بالذكاء الاصطناعي" },
  { id: "f4", name: "المسار المهني", key: "career_path", description: "تتبع المسار المهني" },
  { id: "f5", name: "أسئلة المقابلات", key: "interview_questions", description: "أسئلة تجريبية للمقابلات" },
  { id: "f6", name: "منشئ السيرة الذاتية", key: "cv_builder", description: "أداة بناء السيرة الذاتية" },
  { id: "f7", name: "مقابلات AI", key: "ai_interview", description: "مقابلات تجريبية بالذكاء الاصطناعي" },
  { id: "f8", name: "بحث السير الذاتية", key: "cv_search", description: "بحث في قاعدة السير الذاتية" },
  { id: "f9", name: "نشر الوظائف", key: "job_posting", description: "نشر إعلانات الوظائف" },
  { id: "f10", name: "الدردشة AI", key: "ai_chat", description: "المحادثة مع الذكاء الاصطناعي" },
];

const mockPlanFeatures: PlanFeature[] = [
  { id: "pf1", planVersionId: "v1", featureId: "f1", limitValue: 1 },
  { id: "pf2", planVersionId: "v1", featureId: "f2", limitValue: 5 },
  { id: "pf3", planVersionId: "v2", featureId: "f1", limitValue: null },
  { id: "pf4", planVersionId: "v2", featureId: "f2", limitValue: null },
  { id: "pf5", planVersionId: "v2", featureId: "f3", limitValue: null },
  { id: "pf6", planVersionId: "v2", featureId: "f4", limitValue: null },
  { id: "pf7", planVersionId: "v2", featureId: "f5", limitValue: null },
  { id: "pf8", planVersionId: "v2", featureId: "f6", limitValue: null },
];

const roleLabels: Record<string, string> = {
  job_seeker: "باحث عن عمل",
  company: "شركة",
  hr: "موظف HR",
};

const roleIcons: Record<string, React.ElementType> = {
  job_seeker: Users,
  company: Building2,
  hr: UserCheck,
};

export const SubscriptionManagement = () => {
  const { toast } = useToast();
  const [mainTab, setMainTab] = useState("plans");

  // Plans state
  const [plans, setPlans] = useState<SubscriptionPlan[]>(mockPlans);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [planForm, setPlanForm] = useState({ name: "", description: "", targetRole: "job_seeker" as string });

  // Versions state
  const [versions, setVersions] = useState<PlanVersion[]>(mockVersions);
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const [versionForm, setVersionForm] = useState({ planId: "", price: 0, currency: "EGP", billingPeriod: "monthly" as string });
  const [selectedRoleForVersions, setSelectedRoleForVersions] = useState("job_seeker");
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // Version creation feature assignment
  const [versionFeatures, setVersionFeatures] = useState<{ featureId: string; limitValue: number | null }[]>([]);

  // Features state
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [featureForm, setFeatureForm] = useState({ name: "", key: "", description: "" });
  const [featureToDelete, setFeatureToDelete] = useState<string | null>(null);

  // Plan features state
  const [planFeatures, setPlanFeatures] = useState<PlanFeature[]>(mockPlanFeatures);

  // View version features dialog
  const [viewingVersionId, setViewingVersionId] = useState<string | null>(null);

  // =========== PLAN HANDLERS ===========
  const handleAddPlan = () => {
    setEditingPlan(null);
    setPlanForm({ name: "", description: "", targetRole: "job_seeker" });
    setIsPlanDialogOpen(true);
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setPlanForm({ name: plan.name, description: plan.description, targetRole: plan.targetRole });
    setIsPlanDialogOpen(true);
  };

  const handleSavePlan = () => {
    if (!planForm.name.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم الخطة", variant: "destructive" });
      return;
    }
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, name: planForm.name, description: planForm.description, targetRole: planForm.targetRole as any } : p));
      toast({ title: "تم التحديث", description: "تم تحديث الخطة بنجاح" });
    } else {
      const newPlan: SubscriptionPlan = {
        id: `p${Date.now()}`,
        name: planForm.name,
        description: planForm.description,
        targetRole: planForm.targetRole as any,
        isActive: true,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPlans([...plans, newPlan]);
      toast({ title: "تمت الإضافة", description: "تم إضافة خطة جديدة" });
    }
    setIsPlanDialogOpen(false);
  };

  const handleTogglePlan = (planId: string) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, isActive: !p.isActive } : p));
    const plan = plans.find(p => p.id === planId);
    toast({ title: plan?.isActive ? "تم إيقاف الخطة" : "تم تفعيل الخطة" });
  };

  // =========== VERSION HANDLERS ===========
  const handleAddVersion = (planId: string) => {
    setVersionForm({ planId, price: 0, currency: "EGP", billingPeriod: "monthly" });
    setVersionFeatures([]);
    setIsVersionDialogOpen(true);
  };

  const handleSaveVersion = () => {
    const planVersions = versions.filter(v => v.planId === versionForm.planId);
    const nextVersion = planVersions.length > 0 ? Math.max(...planVersions.map(v => v.versionNumber)) + 1 : 1;
    const newVersionId = `v${Date.now()}`;

    const newVersion: PlanVersion = {
      id: newVersionId,
      planId: versionForm.planId,
      price: versionForm.price,
      currency: versionForm.currency,
      billingPeriod: versionForm.billingPeriod as any,
      versionNumber: nextVersion,
      isActive: true,
    };
    setVersions([...versions, newVersion]);

    // Add plan features
    const newPlanFeatures = versionFeatures.map(vf => ({
      id: `pf${Date.now()}_${vf.featureId}`,
      planVersionId: newVersionId,
      featureId: vf.featureId,
      limitValue: vf.limitValue,
    }));
    setPlanFeatures([...planFeatures, ...newPlanFeatures]);

    toast({ title: "تمت الإضافة", description: `تم إنشاء الإصدار ${nextVersion} بنجاح` });
    setIsVersionDialogOpen(false);
  };

  const handleToggleVersion = (versionId: string) => {
    setVersions(versions.map(v => v.id === versionId ? { ...v, isActive: !v.isActive } : v));
    const version = versions.find(v => v.id === versionId);
    toast({ title: version?.isActive ? "تم إيقاف الإصدار" : "تم تفعيل الإصدار" });
  };

  // =========== FEATURE HANDLERS ===========
  const handleAddFeature = () => {
    setEditingFeature(null);
    setFeatureForm({ name: "", key: "", description: "" });
    setIsFeatureDialogOpen(true);
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature);
    setFeatureForm({ name: feature.name, key: feature.key, description: feature.description });
    setIsFeatureDialogOpen(true);
  };

  const handleSaveFeature = () => {
    if (!featureForm.name.trim() || !featureForm.key.trim()) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    if (editingFeature) {
      setFeatures(features.map(f => f.id === editingFeature.id ? { ...f, name: featureForm.name, description: featureForm.description } : f));
      toast({ title: "تم التحديث", description: "تم تحديث الميزة بنجاح" });
    } else {
      const newFeature: Feature = {
        id: `f${Date.now()}`,
        name: featureForm.name,
        key: featureForm.key,
        description: featureForm.description,
      };
      setFeatures([...features, newFeature]);
      toast({ title: "تمت الإضافة", description: "تم إضافة ميزة جديدة" });
    }
    setIsFeatureDialogOpen(false);
  };

  const isFeatureInUse = (featureId: string) => {
    return planFeatures.some(pf => pf.featureId === featureId);
  };

  const handleDeleteFeature = (featureId: string) => {
    if (isFeatureInUse(featureId)) {
      toast({ title: "لا يمكن الحذف", description: "هذه الميزة مستخدمة في إصدار خطة", variant: "destructive" });
      return;
    }
    setFeatures(features.filter(f => f.id !== featureId));
    setFeatureToDelete(null);
    toast({ title: "تم الحذف", description: "تم حذف الميزة بنجاح" });
  };

  // =========== VERSION FEATURE TOGGLE ===========
  const toggleVersionFeature = (featureId: string) => {
    const existing = versionFeatures.find(vf => vf.featureId === featureId);
    if (existing) {
      setVersionFeatures(versionFeatures.filter(vf => vf.featureId !== featureId));
    } else {
      setVersionFeatures([...versionFeatures, { featureId, limitValue: null }]);
    }
  };

  const updateVersionFeatureLimit = (featureId: string, limitValue: number | null) => {
    setVersionFeatures(versionFeatures.map(vf => vf.featureId === featureId ? { ...vf, limitValue } : vf));
  };

  // =========== HELPERS ===========
  const getFeatureName = (featureId: string) => features.find(f => f.id === featureId)?.name || featureId;
  const getPlanName = (planId: string) => plans.find(p => p.id === planId)?.name || planId;
  const getVersionFeatures = (versionId: string) => planFeatures.filter(pf => pf.planVersionId === versionId);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الخطط</p>
                <p className="text-2xl font-bold mt-1">{plans.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">خطط نشطة</p>
                <p className="text-2xl font-bold mt-1">{plans.filter(p => p.isActive).length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">إصدارات التسعير</p>
                <p className="text-2xl font-bold mt-1">{versions.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">الميزات المتاحة</p>
                <p className="text-2xl font-bold mt-1">{features.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={mainTab} onValueChange={setMainTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 flex justify-start md:justify-end overflow-x-auto no-scrollbar gap-1 w-full whitespace-nowrap">
          <TabsTrigger value="features" className="gap-2 shrink-0">
            <Sparkles className="w-4 h-4" />
            الميزات
          </TabsTrigger>
          <TabsTrigger value="versions" className="gap-2 shrink-0">
            <Layers className="w-4 h-4" />
            إصدارات التسعير
          </TabsTrigger>
          <TabsTrigger value="plans" className="gap-2 shrink-0">
            <Package className="w-4 h-4" />
            الخطط
          </TabsTrigger>
        </TabsList>

        {/* ========== PLANS TAB ========== */}
        <TabsContent value="plans">
          <Tabs defaultValue="job_seeker" className="space-y-4">
            <TabsList className="bg-muted/50 p-1 flex justify-start md:justify-end overflow-x-auto no-scrollbar gap-1 whitespace-nowrap">
              <TabsTrigger value="hr" className="gap-2 shrink-0"><UserCheck className="w-4 h-4" />HR</TabsTrigger>
              <TabsTrigger value="company" className="gap-2 shrink-0"><Building2 className="w-4 h-4" />شركات</TabsTrigger>
              <TabsTrigger value="job_seeker" className="gap-2 shrink-0"><Users className="w-4 h-4" />أفراد</TabsTrigger>
            </TabsList>

            {(["job_seeker", "company", "hr"] as const).map(role => (
              <TabsContent key={role} value={role}>
                <Card>
                  <CardHeader className="flex flex-col md:flex-row-reverse items-start md:items-center justify-between gap-4 p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <span>خطط {roleLabels[role]}</span>
                      {(() => { const Icon = roleIcons[role]; return <Icon className="w-5 h-5 text-primary" />; })()}
                    </CardTitle>
                    <Button onClick={handleAddPlan} className="gap-2 w-full md:w-auto h-9 text-xs md:text-sm">
                      <Plus className="w-4 h-4" />
                      إضافة خطة
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table dir="ltr" className="text-right [&_th]:text-right [&_td]:text-right">
                        <TableHeader>
                          <TableRow className="bg-muted/30">
                            <TableHead>الإجراءات</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>عدد الإصدارات</TableHead>
                            <TableHead>الوصف</TableHead>
                            <TableHead>تاريخ الإنشاء</TableHead>
                            <TableHead className="font-black sticky right-0 bg-background z-10 shadow-[-4px_0_10px_-4px_rgba(0,0,0,0.1)]">اسم الخطة</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {plans.filter(p => p.targetRole === role).map(plan => (
                            <TableRow key={plan.id}>
                              <TableCell>
                                <div className="flex gap-2 justify-end">
                                  <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleTogglePlan(plan.id)}
                                    className={plan.isActive
                                      ? "text-red-600 border-red-200 hover:bg-red-50 h-8 px-3 text-xs"
                                      : "text-emerald-600 border-emerald-200 hover:bg-emerald-50 h-8 px-3 text-xs"
                                    }
                                  >
                                    {plan.isActive ? "إيقاف" : "تفعيل"}
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={plan.isActive ? "default" : "secondary"}
                                  className={plan.isActive ? "bg-emerald-500 hover:bg-emerald-600" : "bg-amber-500 hover:bg-amber-600 text-white"}
                                >
                                  {plan.isActive ? "نشطة" : "معطلة"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{versions.filter(v => v.planId === plan.id).length} إصدار</Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">{plan.description}</TableCell>
                              <TableCell className="text-muted-foreground font-mono text-xs">{plan.createdAt}</TableCell>
                              <TableCell className="font-bold sticky right-0 bg-background/95 backdrop-blur-sm z-10 shadow-[-4px_0_10px_-4px_rgba(0,0,0,0.1)]">
                                {plan.name}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        {/* ========== VERSIONS TAB ========== */}
        <TabsContent value="versions">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Select value={selectedRoleForVersions} onValueChange={setSelectedRoleForVersions}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job_seeker">خطط الأفراد</SelectItem>
                  <SelectItem value="company">خطط الشركات</SelectItem>
                  <SelectItem value="hr">خطط HR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {plans.filter(p => p.targetRole === selectedRoleForVersions).map(plan => (
              <Card key={plan.id}>
                <CardHeader className="flex flex-col md:flex-row-reverse items-start md:items-center justify-between gap-4 p-4 md:p-6">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base md:text-lg">{plan.name}</CardTitle>
                    <Badge variant={plan.isActive ? "default" : "secondary"} className={plan.isActive ? "bg-emerald-500" : ""}>
                      {plan.isActive ? "نشطة" : "معطلة"}
                    </Badge>
                  </div>
                  <Button onClick={() => handleAddVersion(plan.id)} className="gap-2 w-full md:w-auto h-9 text-xs md:text-sm" variant="outline">
                    <Plus className="w-4 h-4" />
                    إصدار جديد
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table dir="ltr" className="text-right [&_th]:text-right [&_td]:text-right">
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead>الإجراءات</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead>الميزات</TableHead>
                          <TableHead>فترة الفوترة</TableHead>
                          <TableHead>السعر</TableHead>
                          <TableHead className="font-black">رقم الإصدار</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {versions.filter(v => v.planId === plan.id).sort((a, b) => b.versionNumber - a.versionNumber).map(version => {
                          const vFeatures = getVersionFeatures(version.id);
                          return (
                            <TableRow key={version.id}>
                              <TableCell>
                                <div className="flex gap-2 justify-end">
                                  <Button variant="ghost" size="icon" onClick={() => setViewingVersionId(version.id)} title="عرض الميزات">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleToggleVersion(version.id)}
                                    className={version.isActive
                                      ? "text-red-600 border-red-200 hover:bg-red-50 h-8 px-3 text-xs"
                                      : "text-emerald-600 border-emerald-200 hover:bg-emerald-50 h-8 px-3 text-xs"
                                    }
                                  >
                                    {version.isActive ? "إيقاف" : "تفعيل"}
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={version.isActive ? "default" : "secondary"}
                                  className={version.isActive ? "bg-emerald-500 hover:bg-emerald-600" : "bg-amber-500 hover:bg-amber-600 text-white"}
                                >
                                  {version.isActive ? "نشط" : "معطل"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1 justify-end">
                                  {vFeatures.length > 0 ? (
                                    <>
                                      {vFeatures.length > 2 && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 h-5">+{vFeatures.length - 2}</Badge>
                                      )}
                                      {vFeatures.slice(0, 2).map(pf => (
                                        <Badge key={pf.id} variant="outline" className="text-[10px] whitespace-nowrap bg-muted/30">
                                          {getFeatureName(pf.featureId)}
                                          {pf.limitValue !== null && <span className="mr-1 text-primary">({pf.limitValue})</span>}
                                        </Badge>
                                      ))}
                                    </>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">بدون ميزات</span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{version.billingPeriod === "monthly" ? "شهري" : "سنوي"}</TableCell>
                              <TableCell className="font-mono">{version.price} {version.currency}</TableCell>
                              <TableCell className="font-bold">v{version.versionNumber}</TableCell>
                            </TableRow>
                          );
                        })}
                        {versions.filter(v => v.planId === plan.id).length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              لا توجد إصدارات بعد
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ========== FEATURES TAB ========== */}
        <TabsContent value="features">
          <Card>
            <CardHeader className="flex flex-col md:flex-row-reverse items-start md:items-center justify-between gap-4 p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <span>كتالوج الميزات</span>
                <Sparkles className="w-5 h-5 text-primary" />
              </CardTitle>
              <Button onClick={handleAddFeature} className="gap-2 w-full md:w-auto h-9 text-xs md:text-sm">
                <Plus className="w-4 h-4" />
                إضافة ميزة
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table dir="ltr" className="text-right [&_th]:text-right [&_td]:text-right">
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>الإجراءات</TableHead>
                      <TableHead>مستخدمة في</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>المفتاح</TableHead>
                      <TableHead className="font-black">اسم الميزة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map(feature => {
                      const usedIn = planFeatures.filter(pf => pf.featureId === feature.id);
                      const inUse = usedIn.length > 0;
                      return (
                        <TableRow key={feature.id}>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="icon" onClick={() => handleEditFeature(feature)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={inUse}
                                onClick={() => setFeatureToDelete(feature.id)}
                                title={inUse ? "لا يمكن حذف ميزة مستخدمة" : "حذف"}
                              >
                                <Trash2 className={`w-4 h-4 ${inUse ? "text-muted-foreground" : "text-destructive"}`} />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {usedIn.length} إصدار
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs max-w-[250px] truncate">{feature.description}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{feature.key}</TableCell>
                          <TableCell className="font-bold">{feature.name}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ========== DIALOGS ========== */}

      {/* Plan Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right">{editingPlan ? "تعديل الخطة" : "إضافة خطة جديدة"}</DialogTitle>
            <DialogDescription className="text-right">
              {editingPlan ? "قم بتعديل بيانات الخطة" : "أدخل بيانات الخطة الجديدة"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>اسم الخطة</Label>
              <Input value={planForm.name} onChange={e => setPlanForm({ ...planForm, name: e.target.value })} placeholder="مثال: احترافي" />
            </div>
            <div className="space-y-2">
              <Label>الوصف</Label>
              <Textarea value={planForm.description} onChange={e => setPlanForm({ ...planForm, description: e.target.value })} placeholder="وصف مختصر للخطة" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>الفئة المستهدفة</Label>
              <Select value={planForm.targetRole} onValueChange={v => setPlanForm({ ...planForm, targetRole: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="job_seeker">باحث عن عمل</SelectItem>
                  <SelectItem value="company">شركة</SelectItem>
                  <SelectItem value="hr">موظف HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPlanDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSavePlan}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Version Dialog */}
      <Dialog open={isVersionDialogOpen} onOpenChange={setIsVersionDialogOpen}>
        <DialogContent dir="rtl" className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right">إنشاء إصدار تسعير جديد</DialogTitle>
            <DialogDescription className="text-right">
              للخطة: {getPlanName(versionForm.planId)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>السعر</Label>
                <Input type="number" min="0" value={versionForm.price} onChange={e => setVersionForm({ ...versionForm, price: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>العملة</Label>
                <Select value={versionForm.currency} onValueChange={v => setVersionForm({ ...versionForm, currency: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EGP">EGP</SelectItem>
                    <SelectItem value="SAR">SAR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>فترة الفوترة</Label>
              <Select value={versionForm.billingPeriod} onValueChange={v => setVersionForm({ ...versionForm, billingPeriod: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="yearly">سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feature assignment */}
            <div className="border-t pt-4 space-y-3">
              <Label className="text-base font-semibold">تعيين الميزات لهذا الإصدار</Label>
              <p className="text-xs text-muted-foreground">اختر الميزات وحدد الحد الأقصى لكل ميزة (اتركه فارغاً = غير محدود)</p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-lg p-3">
                {features.map(feature => {
                  const isSelected = versionFeatures.some(vf => vf.featureId === feature.id);
                  const vf = versionFeatures.find(vf => vf.featureId === feature.id);
                  return (
                    <div key={feature.id} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isSelected ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"}`}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleVersionFeature(feature.id)}
                      />
                      <div className="flex-1 text-right">
                        <p className="text-sm font-medium">{feature.name}</p>
                        <p className="text-xs text-muted-foreground">{feature.key}</p>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            placeholder="∞"
                            className="w-20 h-8 text-xs"
                            value={vf?.limitValue ?? ""}
                            onChange={e => {
                              const val = e.target.value === "" ? null : Number(e.target.value);
                              updateVersionFeatureLimit(feature.id, val);
                            }}
                          />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">الحد</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVersionDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveVersion}>إنشاء الإصدار</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feature Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right">{editingFeature ? "تعديل الميزة" : "إضافة ميزة جديدة"}</DialogTitle>
            <DialogDescription className="text-right">
              {editingFeature ? "يمكنك تعديل الاسم والوصف فقط" : "أدخل بيانات الميزة الجديدة"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>اسم الميزة</Label>
              <Input value={featureForm.name} onChange={e => setFeatureForm({ ...featureForm, name: e.target.value })} placeholder="مثال: فحص السيرة الذاتية" />
            </div>
            <div className="space-y-2">
              <Label>المفتاح (key)</Label>
              <Input
                value={featureForm.key}
                onChange={e => setFeatureForm({ ...featureForm, key: e.target.value })}
                placeholder="مثال: cv_check"
                dir="ltr"
                className="text-right"
                disabled={!!editingFeature}
              />
              {editingFeature && <p className="text-xs text-muted-foreground">لا يمكن تعديل المفتاح</p>}
            </div>
            <div className="space-y-2">
              <Label>الوصف</Label>
              <Textarea value={featureForm.description} onChange={e => setFeatureForm({ ...featureForm, description: e.target.value })} placeholder="وصف مختصر للميزة" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeatureDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveFeature}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Version Features Dialog */}
      <Dialog open={!!viewingVersionId} onOpenChange={open => !open && setViewingVersionId(null)}>
        <DialogContent dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-right">ميزات الإصدار</DialogTitle>
            <DialogDescription className="text-right">
              قائمة الميزات المعينة لهذا الإصدار
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {viewingVersionId && getVersionFeatures(viewingVersionId).length > 0 ? (
              getVersionFeatures(viewingVersionId).map(pf => (
                <div key={pf.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                  <Badge variant="outline" className="text-xs">
                    {pf.limitValue !== null ? `${pf.limitValue}` : "غير محدود"}
                  </Badge>
                  <span className="font-medium text-sm">{getFeatureName(pf.featureId)}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">لا توجد ميزات معينة</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Feature Delete Confirmation */}
      <AlertDialog open={!!featureToDelete} onOpenChange={open => !open && setFeatureToDelete(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle className="text-right">هل أنت متأكد من حذف هذه الميزة؟</AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              لا يمكن التراجع عن هذا الإجراء. سيتم إزالة الميزة نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-end gap-2">
            <AlertDialogCancel onClick={() => setFeatureToDelete(null)}>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={() => featureToDelete && handleDeleteFeature(featureToDelete)} className="bg-red-600 hover:bg-red-700 mx-0">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
