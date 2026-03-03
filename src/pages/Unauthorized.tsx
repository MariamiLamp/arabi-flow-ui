import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowRight, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6" dir="rtl">
      <div className="text-center max-w-md space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">غير مصرح بالوصول</h1>
          <p className="text-muted-foreground text-lg">
            ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة للخلف
          </Button>
          <Button
            onClick={() => {
              if (user?.role === "company") navigate("/company");
              else if (user?.role === "admin") navigate("/admin");
              else navigate("/dashboard");
            }}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            لوحة التحكم
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
