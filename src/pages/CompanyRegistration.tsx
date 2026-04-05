import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      toast({ title: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "كلمة المرور غير متطابقة", variant: "destructive" });
      return;
    }
    toast({ title: "تم إنشاء حساب الشركة بنجاح! 🎉", description: "أكمل ملف الشركة للوصول لجميع المميزات" });
    navigate("/company");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">إنشاء حساب شركة</h1>
          <p className="text-muted-foreground text-sm">سجّل الآن وأكمل ملف الشركة لاحقاً</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">الاسم الأول *</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="الاسم الأول" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="lastName">اسم العائلة *</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="اسم العائلة" className="mt-1" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">البريد الإلكتروني للعمل *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hr@company.com" className="pr-10" dir="ltr" required />
                </div>
              </div>

              <div>
                <Label htmlFor="password">كلمة المرور *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة المرور" className="pr-10" required />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="أعد إدخال كلمة المرور" className="pr-10" required />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold mt-2">
                إنشاء حساب
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                لديك حساب بالفعل؟{" "}
                <Button variant="link" onClick={() => navigate("/auth")} className="px-1 text-primary font-semibold">
                  تسجيل الدخول
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegistration;
