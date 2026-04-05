import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  FileText,
  Briefcase,
  Languages,
  Plus,
  X,
  Upload,
  Save,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CompleteProfileForm = () => {
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>("photo");

  // Form states
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  // Experience
  const [experiences, setExperiences] = useState([
    { title: "", company: "", startDate: "", endDate: "", current: false, description: "" },
  ]);

  // Education
  const [education, setEducation] = useState([
    { degree: "", institution: "", year: "" },
  ]);

  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Languages
  const [languages, setLanguages] = useState([
    { name: "", level: "" },
  ]);

  // CV
  const [cvFile, setCvFile] = useState<File | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    toast({
      title: "تم الحفظ",
      description: "تم تحديث ملفك الشخصي بنجاح",
    });
  };

  const sections = [
    {
      id: "photo",
      icon: Camera,
      title: "الصورة الشخصية والمعلومات الأساسية",
      content: (
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
                    if (file) {
                      setProfilePhoto(URL.createObjectURL(file));
                    }
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
              <Label htmlFor="phone" className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                رقم الهاتف
              </Label>
              <Input
                id="phone"
                placeholder="+966 5XX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                className="text-left"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                الموقع
              </Label>
              <Input
                id="location"
                placeholder="الرياض، السعودية"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">نبذة مختصرة</Label>
            <Textarea
              id="bio"
              placeholder="اكتب نبذة مختصرة عن نفسك وخبراتك..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      icon: Briefcase,
      title: "الخبرات المهنية",
      content: (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">خبرة {index + 1}</span>
                {experiences.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExperiences(experiences.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">المسمى الوظيفي</Label>
                  <Input
                    placeholder="مطور برمجيات"
                    value={exp.title}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index].title = e.target.value;
                      setExperiences(updated);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">الشركة</Label>
                  <Input
                    placeholder="اسم الشركة"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index].company = e.target.value;
                      setExperiences(updated);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">تاريخ البداية</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index].startDate = e.target.value;
                      setExperiences(updated);
                    }}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">تاريخ النهاية</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[index].endDate = e.target.value;
                      setExperiences(updated);
                    }}
                    dir="ltr"
                    placeholder="الحالي"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">وصف المهام</Label>
                <Textarea
                  placeholder="اوصف مهامك ومسؤولياتك..."
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[index].description = e.target.value;
                    setExperiences(updated);
                  }}
                  rows={2}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              setExperiences([
                ...experiences,
                { title: "", company: "", startDate: "", endDate: "", current: false, description: "" },
              ])
            }
          >
            <Plus className="w-4 h-4" />
            إضافة خبرة
          </Button>
        </div>
      ),
    },
    {
      id: "education",
      icon: GraduationCap,
      title: "التعليم",
      content: (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">مؤهل {index + 1}</span>
                {education.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEducation(education.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">الدرجة العلمية</Label>
                  <Input
                    placeholder="بكالوريوس"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].degree = e.target.value;
                      setEducation(updated);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">الجامعة / المعهد</Label>
                  <Input
                    placeholder="جامعة الملك سعود"
                    value={edu.institution}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].institution = e.target.value;
                      setEducation(updated);
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">سنة التخرج</Label>
                  <Input
                    placeholder="2023"
                    value={edu.year}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].year = e.target.value;
                      setEducation(updated);
                    }}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              setEducation([...education, { degree: "", institution: "", year: "" }])
            }
          >
            <Plus className="w-4 h-4" />
            إضافة مؤهل
          </Button>
        </div>
      ),
    },
    {
      id: "skills",
      icon: Languages,
      title: "المهارات واللغات",
      content: (
        <div className="space-y-6">
          {/* Skills */}
          <div className="space-y-3">
            <Label className="font-medium">المهارات</Label>
            <div className="flex gap-2">
              <Input
                placeholder="أضف مهارة..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button variant="outline" size="icon" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1 pl-1">
                    <button onClick={() => removeSkill(skill)}>
                      <X className="w-3 h-3" />
                    </button>
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <Label className="font-medium">اللغات</Label>
            {languages.map((lang, index) => (
              <div key={index} className="flex gap-3 items-end">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs">اللغة</Label>
                  <Input
                    placeholder="العربية"
                    value={lang.name}
                    onChange={(e) => {
                      const updated = [...languages];
                      updated[index].name = e.target.value;
                      setLanguages(updated);
                    }}
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <Label className="text-xs">المستوى</Label>
                  <Select
                    value={lang.level}
                    onValueChange={(value) => {
                      const updated = [...languages];
                      updated[index].level = value;
                      setLanguages(updated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="native">اللغة الأم</SelectItem>
                      <SelectItem value="advanced">متقدم</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="beginner">مبتدئ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {languages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setLanguages(languages.filter((_, i) => i !== index))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setLanguages([...languages, { name: "", level: "" }])}
            >
              <Plus className="w-4 h-4" />
              إضافة لغة
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "cv",
      icon: FileText,
      title: "السيرة الذاتية",
      content: (
        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
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
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            {cvFile ? (
              <div>
                <p className="font-medium text-foreground">{cvFile.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(cvFile.size / 1024).toFixed(0)} KB
                </p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-foreground">اسحب الملف هنا أو اضغط للرفع</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX — حد أقصى 5MB</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          أكمل ملفك الشخصي
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          أضف المعلومات التالية لتحسين ظهورك أمام أصحاب العمل
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-border rounded-xl overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-right"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              {expandedSection === section.id ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expandedSection === section.id && (
              <div className="px-4 pb-4 border-t border-border pt-4">
                {section.content}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4">
          <Button onClick={handleSave} className="gap-2 w-full sm:w-auto">
            <Save className="w-4 h-4" />
            حفظ الملف الشخصي
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
