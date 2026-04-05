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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  FileText,
  Briefcase,
  Languages,
  Plus,
  X,
  Upload,
  Save,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompleteProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompleteProfileForm = ({ open, onOpenChange }: CompleteProfileFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);

  // Form states
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const [experiences, setExperiences] = useState([
    { title: "", company: "", startDate: "", endDate: "", description: "" },
  ]);

  const [education, setEducation] = useState([
    { degree: "", institution: "", year: "" },
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [languages, setLanguages] = useState([{ name: "", level: "" }]);

  const [cvFile, setCvFile] = useState<File | null>(null);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const steps = [
    {
      id: "photo",
      icon: Camera,
      title: "الصورة والمعلومات الأساسية",
      description: "أضف صورتك ومعلومات التواصل",
    },
    {
      id: "experience",
      icon: Briefcase,
      title: "الخبرات المهنية",
      description: "أضف خبراتك العملية السابقة",
    },
    {
      id: "education",
      icon: GraduationCap,
      title: "التعليم",
      description: "أضف مؤهلاتك الأكاديمية",
    },
    {
      id: "skills",
      icon: Languages,
      title: "المهارات واللغات",
      description: "أضف مهاراتك واللغات التي تتحدثها",
    },
    {
      id: "cv",
      icon: FileText,
      title: "السيرة الذاتية",
      description: "ارفع ملف سيرتك الذاتية",
    },
  ];

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  const handleSave = () => {
    toast({ title: "تم الحفظ", description: "تم تحديث ملفك الشخصي بنجاح" });
    onOpenChange(false);
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-muted-foreground" />
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
                      if (file) setProfilePhoto(URL.createObjectURL(file));
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-4 h-4" />
                  رفع صورة
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG أو PNG، حد أقصى 2MB</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />رقم الهاتف</Label>
                <Input placeholder="+966 5XX XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" className="text-left" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />الموقع</Label>
                <Input placeholder="الرياض، السعودية" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>نبذة مختصرة</Label>
              <Textarea placeholder="اكتب نبذة مختصرة عن نفسك وخبراتك..." value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">خبرة {index + 1}</span>
                  {experiences.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">المسمى الوظيفي</Label>
                    <Input placeholder="مطور برمجيات" value={exp.title} onChange={(e) => { const u = [...experiences]; u[index].title = e.target.value; setExperiences(u); }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">الشركة</Label>
                    <Input placeholder="اسم الشركة" value={exp.company} onChange={(e) => { const u = [...experiences]; u[index].company = e.target.value; setExperiences(u); }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">تاريخ البداية</Label>
                    <Input type="month" value={exp.startDate} onChange={(e) => { const u = [...experiences]; u[index].startDate = e.target.value; setExperiences(u); }} dir="ltr" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">تاريخ النهاية</Label>
                    <Input type="month" value={exp.endDate} onChange={(e) => { const u = [...experiences]; u[index].endDate = e.target.value; setExperiences(u); }} dir="ltr" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">وصف المهام</Label>
                  <Textarea placeholder="اوصف مهامك ومسؤولياتك..." value={exp.description} onChange={(e) => { const u = [...experiences]; u[index].description = e.target.value; setExperiences(u); }} rows={2} />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setExperiences([...experiences, { title: "", company: "", startDate: "", endDate: "", description: "" }])}>
              <Plus className="w-4 h-4" />إضافة خبرة
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">مؤهل {index + 1}</span>
                  {education.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => setEducation(education.filter((_, i) => i !== index))}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">الدرجة العلمية</Label>
                    <Input placeholder="بكالوريوس" value={edu.degree} onChange={(e) => { const u = [...education]; u[index].degree = e.target.value; setEducation(u); }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">الجامعة / المعهد</Label>
                    <Input placeholder="جامعة الملك سعود" value={edu.institution} onChange={(e) => { const u = [...education]; u[index].institution = e.target.value; setEducation(u); }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">سنة التخرج</Label>
                    <Input placeholder="2023" value={edu.year} onChange={(e) => { const u = [...education]; u[index].year = e.target.value; setEducation(u); }} dir="ltr" />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setEducation([...education, { degree: "", institution: "", year: "" }])}>
              <Plus className="w-4 h-4" />إضافة مؤهل
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="font-medium">المهارات</Label>
              <div className="flex gap-2">
                <Input placeholder="أضف مهارة..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                <Button variant="outline" size="icon" onClick={addSkill}><Plus className="w-4 h-4" /></Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1 pl-1">
                      <button onClick={() => removeSkill(skill)}><X className="w-3 h-3" /></button>
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label className="font-medium">اللغات</Label>
              {languages.map((lang, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-xs">اللغة</Label>
                    <Input placeholder="العربية" value={lang.name} onChange={(e) => { const u = [...languages]; u[index].name = e.target.value; setLanguages(u); }} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-xs">المستوى</Label>
                    <Select value={lang.level} onValueChange={(v) => { const u = [...languages]; u[index].level = v; setLanguages(u); }}>
                      <SelectTrigger><SelectValue placeholder="اختر المستوى" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">اللغة الأم</SelectItem>
                        <SelectItem value="advanced">متقدم</SelectItem>
                        <SelectItem value="intermediate">متوسط</SelectItem>
                        <SelectItem value="beginner">مبتدئ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {languages.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => setLanguages(languages.filter((_, i) => i !== index))}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setLanguages([...languages, { name: "", level: "" }])}>
                <Plus className="w-4 h-4" />إضافة لغة
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div
            className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".pdf,.doc,.docx";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) setCvFile(file);
              };
              input.click();
            }}
          >
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            {cvFile ? (
              <div>
                <p className="font-medium text-foreground">{cvFile.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{(cvFile.size / 1024).toFixed(0)} KB</p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-foreground">اسحب الملف هنا أو اضغط للرفع</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX — حد أقصى 5MB</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

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

        {/* Step indicators */}
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

        {/* Step content */}
        <div className="py-2">{renderStepContent()}</div>

        {/* Footer navigation */}
        <DialogFooter className="flex-row-reverse sm:flex-row-reverse gap-2 pt-2">
          {isLastStep ? (
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              حفظ الملف الشخصي
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(currentStep + 1)} className="gap-2">
              التالي
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          {!isFirstStep && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="gap-2">
              <ArrowRight className="w-4 h-4" />
              السابق
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
