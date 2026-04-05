import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CompanyCompleteProfileForm } from "@/components/dashboard/CompanyCompleteProfileForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Mail,
  Phone,
  Upload,
  Save,
  Edit,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Coffee,
  GraduationCap,
  Wifi,
  Dumbbell,
  Baby,
  Plane,
  Camera,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyProfileTabProps {
  companyInfo: {
    name: string;
    email: string;
    phone: string;
    website: string;
    bio: string;
    location: string;
    logo: string;
  };
  setCompanyInfo: (info: any) => void;
}

const CompanyProfileTab = ({ companyInfo, setCompanyInfo }: CompanyProfileTabProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleteFormOpen, setIsCompleteFormOpen] = useState(false);

  // Extended profile data
  const [industry, setIndustry] = useState("تكنولوجيا المعلومات");
  const [companySize, setCompanySize] = useState("200-500 موظف");
  const [founded, setFounded] = useState("2015");
  const [about, setAbout] = useState(
    "شركة رائدة في مجال الحلول التقنية والبرمجيات في المنطقة. نعمل مع أكثر من 300 عميل في مختلف القطاعات، ونفخر بفريقنا المتنوع والمبدع."
  );

  // Values
  const [values, setValues] = useState(["الابتكار والإبداع", "العمل الجماعي", "التطوير المستمر"]);
  const [valueInput, setValueInput] = useState("");

  // Tech stack
  const [techStack, setTechStack] = useState(["React", "TypeScript", "Node.js", "Python", "AWS"]);
  const [techInput, setTechInput] = useState("");

  // Benefits
  const [benefits, setBenefits] = useState([
    "عمل عن بُعد مرن",
    "برامج تدريب وتطوير",
    "تأمين صحي شامل",
    "بيئة عمل محفزة",
  ]);
  const [benefitInput, setBenefitInput] = useState("");

  // Profile completion
  const hasLogo = !!companyInfo.logo;
  const hasAbout = about.length > 50;
  const hasValues = values.length >= 3;
  const hasTech = techStack.length >= 3;
  const hasBenefits = benefits.length >= 3;
  const hasBasicInfo = !!companyInfo.name && !!companyInfo.email && !!companyInfo.phone;

  const completionItems = [
    { done: hasLogo, label: "شعار الشركة" },
    { done: hasBasicInfo, label: "المعلومات الأساسية" },
    { done: hasAbout, label: "نبذة عن الشركة" },
    { done: hasValues, label: "قيم الشركة" },
    { done: hasTech, label: "التقنيات المستخدمة" },
    { done: hasBenefits, label: "المزايا والفوائد" },
  ];
  const completionPercentage = Math.round(
    (completionItems.filter((i) => i.done).length / completionItems.length) * 100
  );

  const addTag = (
    input: string,
    setInput: (v: string) => void,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()]);
      setInput("");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "تم الحفظ", description: "تم تحديث الملف الشخصي للشركة بنجاح" });
  };

  return (
    <div className="space-y-6">
      {/* Complete Profile Banner */}
      {completionPercentage < 100 && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">أكمل ملف شركتك</h3>
              <p className="text-sm text-muted-foreground">
                ملف شركتك مكتمل بنسبة {completionPercentage}٪ — أكمله لجذب أفضل المرشحين
              </p>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2 mb-4" />
          <div className="flex flex-wrap gap-2">
            {completionItems
              .filter((i) => !i.done)
              .map((item, idx) => (
                <Badge key={idx} variant="outline" className="gap-1.5 border-primary/30 text-primary">
                  <AlertCircle className="w-3 h-3" />
                  {item.label}
                </Badge>
              ))}
            {completionItems
              .filter((i) => i.done)
              .map((item, idx) => (
                <Badge key={idx} variant="secondary" className="gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {item.label}
                </Badge>
              ))}
          </div>
          <Button size="sm" className="gap-2 mt-4" onClick={() => setIsCompleteFormOpen(true)}>
            إكمال ملف الشركة
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      )}

      <CompanyCompleteProfileForm
        open={isCompleteFormOpen}
        onOpenChange={setIsCompleteFormOpen}
        companyInfo={companyInfo}
        setCompanyInfo={setCompanyInfo}
      />

      {/* Company Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {companyInfo.logo ? (
                  <img src={companyInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          setCompanyInfo({ ...companyInfo, logo: reader.result as string });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4 w-full">
              {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اسم الشركة</Label>
                    <Input
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      dir="ltr"
                      className="text-left"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الهاتف</Label>
                    <Input
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      dir="ltr"
                      className="text-left"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الموقع الإلكتروني</Label>
                    <Input
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                      dir="ltr"
                      className="text-left"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الموقع الجغرافي</Label>
                    <Input
                      value={companyInfo.location}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>القطاع</Label>
                    <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>حجم الشركة</Label>
                    <Input value={companySize} onChange={(e) => setCompanySize(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>سنة التأسيس</Label>
                    <Input value={founded} onChange={(e) => setFounded(e.target.value)} dir="ltr" className="text-left" />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{companyInfo.name}</h2>
                    <p className="text-muted-foreground mt-1">{companyInfo.bio}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{companyInfo.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{companySize}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />تأسست {founded}</span>
                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{companyInfo.website}</span>
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{companyInfo.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{companyInfo.phone}</span>
                  </div>
                  <Badge variant="secondary">{industry}</Badge>
                </>
              )}
            </div>

            {/* Edit/Save Button */}
            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="gap-2">
                    <Save className="w-4 h-4" />حفظ
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4" />تعديل
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="w-5 h-5 text-primary" />
            نبذة عن الشركة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={5}
                placeholder="اكتب نبذة تفصيلية عن شركتك..."
              />
              <p className="text-xs text-muted-foreground">{about.length} حرف (يفضل أكثر من 50)</p>
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">{about}</p>
          )}
        </CardContent>
      </Card>

      {/* Values */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="w-5 h-5 text-primary" />
            قيم الشركة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="أضف قيمة..."
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(valueInput, setValueInput, values, setValues))}
              />
              <Button variant="outline" size="icon" onClick={() => addTag(valueInput, setValueInput, values, setValues)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {values.map((v) => (
              <Badge key={v} variant="outline" className="gap-1.5 px-3 py-1.5 border-primary/30 text-primary">
                {isEditing && (
                  <button onClick={() => setValues(values.filter((x) => x !== v))}>
                    <X className="w-3 h-3" />
                  </button>
                )}
                {v}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="w-5 h-5 text-primary" />
            التقنيات المستخدمة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="أضف تقنية..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(techInput, setTechInput, techStack, setTechStack))}
              />
              <Button variant="outline" size="icon" onClick={() => addTag(techInput, setTechInput, techStack, setTechStack)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <Badge key={t} variant="secondary" className="gap-1.5 px-3 py-1.5">
                {isEditing && (
                  <button onClick={() => setTechStack(techStack.filter((x) => x !== t))}>
                    <X className="w-3 h-3" />
                  </button>
                )}
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Coffee className="w-5 h-5 text-primary" />
            المزايا والفوائد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="أضف ميزة..."
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(benefitInput, setBenefitInput, benefits, setBenefits))}
              />
              <Button variant="outline" size="icon" onClick={() => addTag(benefitInput, setBenefitInput, benefits, setBenefits)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground flex-1">{b}</span>
                {isEditing && (
                  <button onClick={() => setBenefits(benefits.filter((x) => x !== b))}>
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfileTab;
