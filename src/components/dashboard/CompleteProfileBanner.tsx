import { AlertCircle, ArrowLeft, Camera, FileText, Briefcase, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CompleteProfileBannerProps {
  completionPercentage?: number;
  onStartComplete?: () => void;
}

export const CompleteProfileBanner = ({ completionPercentage = 30, onStartComplete }: CompleteProfileBannerProps) => {
  const missingItems = [
    { icon: Camera, label: "صورة شخصية" },
    { icon: FileText, label: "السيرة الذاتية" },
    { icon: Briefcase, label: "الخبرات المهنية" },
    { icon: Languages, label: "اللغات والمهارات" },
  ];

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 opacity-0 animate-fade-up">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">أكمل ملفك الشخصي</h3>
          <p className="text-sm text-muted-foreground">
            ملفك مكتمل بنسبة {completionPercentage}٪ — أكمله لتحصل على فرص أفضل وظهور أعلى لأصحاب العمل
          </p>
        </div>
      </div>

      <Progress value={completionPercentage} className="h-2 mb-4" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {missingItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground bg-background rounded-lg p-2 border border-border/50">
            <item.icon className="w-3.5 h-3.5 text-primary" />
            {item.label}
          </div>
        ))}
      </div>

      <Button size="sm" className="gap-2" onClick={onStartComplete}>
        إكمال الملف الشخصي
        <ArrowLeft className="w-4 h-4" />
      </Button>
    </div>
  );
};
