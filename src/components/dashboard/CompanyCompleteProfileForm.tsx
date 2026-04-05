import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Building2,
  Camera,
  MapPin,
  Globe,
  Users,
  Calendar,
  Mail,
  Phone,
  Plus,
  X,
  Upload,
  Save,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Coffee,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyCompleteProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export const CompanyCompleteProfileForm = ({
  open,
  onOpenChange,
  companyInfo,
  setCompanyInfo,
}: CompanyCompleteProfileFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);

  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [founded, setFounded] = useState("");
  const [about, setAbout] = useState("");

  const [values, setValues] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState("");

  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState("");

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

  const steps = [
    {
      id: "basic",
      icon: Building2,
      title: "المعلومات الأساسية",
      description: "أضف شعار الشركة ومعلومات التواصل",
    },
    {
      id: "about",
      icon: Globe,
      title: "نبذة عن الشركة",
      description: "اكتب وصفاً تفصيلياً عن شركتك",
    },
    {
      id: "values",
      icon: CheckCircle,
      title: "القيم والثقافة",
      description: "أضف قيم شركتك الأساسية",
    },
    {
      id: "tech",
      icon: Briefcase,
      title: "التقنيات المستخدمة",
      description: "أضف التقنيات التي يستخدمها فريقك",
    },
    {
      id: "benefits",
      icon: Coffee,
      title: "المزايا والفوائد",
      description: "أضف المزايا التي تقدمها للموظفين",
    },
  ];

  const progressValue = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleSave = () => {
    toast({ title: "تم الحفظ", description: "تم تحديث ملف الشركة بنجاح" });
    onOpenChange(false);
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {companyInfo.logo ? (
                  <img src={companyInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          setCompanyInfo({ ...companyInfo, logo: reader.result as string });
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-4 h-4" />
                  رفع الشعار
                </Button>
                <p className="text-xs text-muted-foreground mt-1">PNG أو JPG، حد أقصى 2MB</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />اسم الشركة</Label>
                <Input value={companyInfo.name} onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />البريد الإلكتروني</Label>
                <Input value={companyInfo.email} onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })} dir="ltr" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />رقم الهاتف</Label>
                <Input value={companyInfo.phone} onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })} dir="ltr" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />الموقع الإلكتروني</Label>
                <Input value={companyInfo.website} onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })} dir="ltr" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />الموقع الجغرافي</Label>
                <Input value={companyInfo.location} onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />حجم الشركة</Label>
                <Input placeholder="200-500 موظف" value={companySize} onChange={(e) => setCompanySize(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>القطاع</Label>
                <Input placeholder="تكنولوجيا المعلومات" value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />سنة التأسيس</Label>
                <Input placeholder="2015" value={founded} onChange={(e) => setFounded(e.target.value)} dir="ltr" className="text-left" />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={6}
              placeholder="اكتب نبذة تفصيلية عن شركتك، رؤيتها، رسالتها، وما يميزها عن غيرها..."
            />
            <p className="text-xs text-muted-foreground">{about.length} حرف (يفضل أكثر من 100 حرف)</p>
            <div className="space-y-2">
              <Label>الوصف المختصر</Label>
              <Input
                value={companyInfo.bio}
                onChange={(e) => setCompanyInfo({ ...companyInfo, bio: e.target.value })}
                placeholder="وصف مختصر يظهر أسفل اسم الشركة"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="أضف قيمة مثل: الابتكار، العمل الجماعي..."
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(valueInput, setValueInput, values, setValues))}
              />
              <Button variant="outline" size="icon" onClick={() => addTag(valueInput, setValueInput, values, setValues)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {values.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {values.map((v) => (
                  <Badge key={v} variant="outline" className="gap-1.5 px-3 py-1.5 border-primary/30 text-primary">
                    <button onClick={() => setValues(values.filter((x) => x !== v))}><X className="w-3 h-3" /></button>
                    {v}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">لم تُضف أي قيم بعد</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="أضف تقنية مثل: React, Python, AWS..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(techInput, setTechInput, techStack, setTechStack))}
              />
              <Button variant="outline" size="icon" onClick={() => addTag(techInput, setTechInput, techStack, setTechStack)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {techStack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1.5 px-3 py-1.5">
                    <button onClick={() => setTechStack(techStack.filter((x) => x !== t))}><X className="w-3 h-3" /></button>
                    {t}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">لم تُضف أي تقنيات بعد</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="أضف ميزة مثل: تأمين صحي، عمل عن بُعد..."
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag(benefitInput, setBenefitInput, benefits, setBenefits))}
              />
              <Button variant="outline" size="icon" onClick={() => addTag(benefitInput, setBenefitInput, benefits, setBenefits)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {benefits.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-2">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground flex-1">{b}</span>
                    <button onClick={() => setBenefits(benefits.filter((x) => x !== b))}>
                      <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">لم تُضف أي مزايا بعد</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center gap-2 text-lg">
            {(() => { const Icon = steps[currentStep].icon; return <Icon className="w-5 h-5 text-primary" />; })()}
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>الخطوة {currentStep + 1} من {steps.length}</span>
            <span>{Math.round(progressValue)}٪</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between gap-1">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors ${
                  index === currentStep
                    ? "text-primary font-medium bg-primary/10"
                    : index < currentStep
                      ? "text-primary/70"
                      : "text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[10px]">
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="py-2">{renderStepContent()}</div>

        <DialogFooter className="flex-row-reverse sm:flex-row-reverse gap-2 pt-2">
          {isLastStep ? (
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />حفظ ملف الشركة
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(currentStep + 1)} className="gap-2">
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          {!isFirstStep && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="gap-2">
              <ArrowRight className="w-4 h-4" />السابق
            </Button>
          )}
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="sm:ml-auto">
            لاحقاً
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
