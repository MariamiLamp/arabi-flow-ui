import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Globe,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Upload,
  Save,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Coffee,
  FileText,
  Shield,
  X,
  Plus,
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
  const [founded, setFounded] = useState("");
  const [about, setAbout] = useState("");

  // Legal info
  const [taxNumber, setTaxNumber] = useState("");
  const [commercialRegister, setCommercialRegister] = useState<File | null>(null);
  const [taxCertificate, setTaxCertificate] = useState<File | null>(null);
  const [otherDocs, setOtherDocs] = useState<File[]>([]);

  // Benefits
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState("");

  const addBenefit = () => {
    if (benefitInput.trim() && !benefits.includes(benefitInput.trim())) {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const triggerFileUpload = (accept: string, onFile: (file: File) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onFile(file);
    };
    input.click();
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
      id: "legal",
      icon: Shield,
      title: "المعلومات القانونية",
      description: "أضف الرقم الضريبي والمستندات القانونية",
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
                  onClick={() =>
                    triggerFileUpload("image/*", (file) => {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setCompanyInfo({ ...companyInfo, logo: reader.result as string });
                      reader.readAsDataURL(file);
                    })
                  }
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
                <Label>القطاع</Label>
                <Input placeholder="تكنولوجيا المعلومات" value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />سنة التأسيس</Label>
                <Input placeholder="2015" value={founded} onChange={(e) => setFounded(e.target.value)} dir="ltr" className="text-left max-w-[200px]" />
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
          <div className="space-y-5">
            {/* Tax Number */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 font-medium">
                <Shield className="w-4 h-4 text-primary" />
                الرقم الضريبي
              </Label>
              <Input
                placeholder="أدخل الرقم الضريبي للشركة"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                dir="ltr"
                className="text-left"
              />
              <p className="text-xs text-muted-foreground">رقم التسجيل الضريبي (VAT) الخاص بالشركة</p>
            </div>

            {/* Commercial Register */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-primary" />
                السجل التجاري
              </Label>
              <div
                className="border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => triggerFileUpload(".pdf,.jpg,.jpeg,.png", (file) => setCommercialRegister(file))}
              >
                {commercialRegister ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{commercialRegister.name}</p>
                      <p className="text-xs text-muted-foreground">{(commercialRegister.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setCommercialRegister(null); }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-foreground font-medium">ارفع نسخة من السجل التجاري</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG — حد أقصى 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tax Certificate */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-primary" />
                شهادة الضريبة
              </Label>
              <div
                className="border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => triggerFileUpload(".pdf,.jpg,.jpeg,.png", (file) => setTaxCertificate(file))}
              >
                {taxCertificate ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{taxCertificate.name}</p>
                      <p className="text-xs text-muted-foreground">{(taxCertificate.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setTaxCertificate(null); }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-foreground font-medium">ارفع شهادة التسجيل الضريبي</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG — حد أقصى 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Other Legal Documents */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-primary" />
                مستندات أخرى (اختياري)
              </Label>
              <p className="text-xs text-muted-foreground">رخصة العمل، عقد التأسيس، أو أي مستندات قانونية أخرى</p>
              {otherDocs.length > 0 && (
                <div className="space-y-2">
                  {otherDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground flex-1">{doc.name}</span>
                      <span className="text-xs text-muted-foreground">{(doc.size / 1024).toFixed(0)} KB</span>
                      <Button variant="ghost" size="sm" onClick={() => setOtherDocs(otherDocs.filter((_, i) => i !== idx))}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => triggerFileUpload(".pdf,.jpg,.jpeg,.png,.doc,.docx", (file) => setOtherDocs([...otherDocs, file]))}
              >
                <Plus className="w-4 h-4" />
                إضافة مستند
              </Button>
            </div>
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
