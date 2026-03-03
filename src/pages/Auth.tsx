import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Building2, ShieldCheck, User } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, selectedRole);

    if (success) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة الموارد البشرية",
      });

      if (selectedRole === "admin") {
        navigate("/admin");
      } else if (selectedRole === "company") {
        navigate("/company");
      } else {
        navigate("/");
      }
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "البريد الإلكتروني أو كلمة المرور أو نوع الحساب غير صحيح",
        variant: "destructive",
      });
    }
  };

  const roles = [
    {
      value: "user" as UserRole,
      label: "باحث عن عمل",
      icon: User,
    },
    {
      value: "company" as UserRole,
      label: "شركة / HR",
      icon: Building2,
    },
    {
      value: "admin" as UserRole,
      label: "مدير النظام",
      icon: ShieldCheck,
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">منصة الموارد البشرية</h1>
          <p className="text-muted-foreground mt-2">منصة التوظيف الذكية</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>اختر نوع الحساب وأدخل بياناتك</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label>نوع الحساب</Label>
                <Tabs
                  value={selectedRole}
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <TabsTrigger key={role.value} value={role.value} className="gap-1.5 text-xs sm:text-sm">
                          <Icon className="w-4 h-4" />
                          <span>{role.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-left"
                  dir="ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                تسجيل الدخول
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">ليس لديك حساب؟ </span>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto"
                onClick={() => navigate("/register")}
              >
                إنشاء حساب جديد
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

