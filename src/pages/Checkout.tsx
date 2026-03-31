import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Shield,
  Check,
  ArrowRight,
  Crown,
  Sparkles,
  Zap,
  Building,
  Building2,
  UserCheck,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const planIcons: Record<string, React.ElementType> = {
  "مجانية": Zap,
  "الاحترافية": Crown,
  "المتميزة": Sparkles,
  "HR الأساسية": UserCheck,
  "HR الاحترافية": Sparkles,
  "باقة الأعمال": Building,
  "باقة المؤسسات": Building2,
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const adRequest = location.state?.adRequest;

  if (!adRequest) {
    navigate("/subscription");
    return null;
  }

  const subtotal = adRequest.price;
  const tax = +(subtotal * 0.15).toFixed(2);
  const grandTotal = +(subtotal + tax).toFixed(2);
  const PlanIcon = planIcons[adRequest.title] || Crown;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "تم الاشتراك بنجاح! 🎉",
        description: `تم تفعيل باقة ${adRequest.title} — استمتع بجميع المميزات`,
      });
      setIsProcessing(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            إتمام الاشتراك
          </h1>
          <p className="text-sm text-muted-foreground">
            أنت على بعد خطوة واحدة من تفعيل باقتك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Payment Form - Right side (RTL) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Payment Method */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6 flex-row-reverse">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-right">
                    <h2 className="font-bold text-foreground">بيانات الدفع</h2>
                    <p className="text-xs text-muted-foreground">
                      أدخل بيانات بطاقتك البنكية
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground text-right block">
                      الاسم على البطاقة
                    </label>
                    <Input
                      placeholder="مثال: أحمد محمد"
                      className="h-10 text-right text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground text-right block">
                      رقم البطاقة
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="0000 0000 0000 0000"
                        className="h-10 text-right text-sm pr-3 pl-10"
                        dir="ltr"
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground text-right block">
                        تاريخ الانتهاء
                      </label>
                      <Input
                        placeholder="MM / YY"
                        className="h-10 text-center text-sm"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground text-right block">
                        رمز الأمان (CVV)
                      </label>
                      <Input
                        placeholder="•••"
                        className="h-10 text-center text-sm"
                        dir="ltr"
                        type="password"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pay Button */}
            <Button
              variant="gradient"
              className="w-full h-12 text-sm font-bold gap-2"
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري معالجة الدفع...
                </div>
              ) : (
                <>
                  تأكيد الدفع — {grandTotal} ر.س
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span>جميع البيانات مشفرة ومحمية بتقنية SSL</span>
            </div>
          </div>

          {/* Order Summary - Left side (RTL) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Plan Summary Card */}
            <Card className="border-border/60 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-5 border-b border-border/40">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                    <PlanIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="font-bold text-foreground text-sm">
                      {adRequest.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-[10px] h-5 bg-primary/10 text-primary border-primary/20"
                    >
                      اشتراك {adRequest.duration}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subtotal} ر.س</span>
                    <span className="text-muted-foreground">سعر الباقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tax} ر.س</span>
                    <span className="text-muted-foreground">
                      ضريبة القيمة المضافة (15%)
                    </span>
                  </div>
                  <div className="border-t border-border/60 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        {grandTotal} ر.س
                      </span>
                      <span className="font-bold text-foreground">
                        الإجمالي
                      </span>
                    </div>
                    {adRequest.duration === "سنوي" && (
                      <p className="text-[11px] text-emerald-600 mt-1 text-left">
                        وفّرت 20% مع الاشتراك السنوي ✨
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-4 space-y-3">
                {[
                  { icon: Shield, text: "ضمان استرداد خلال 14 يوم" },
                  { icon: Check, text: "إلغاء الاشتراك في أي وقت" },
                  { icon: Lock, text: "دفع آمن ومشفر بالكامل" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 flex-row-reverse text-right"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Back Link */}
            <button
              onClick={() => navigate("/subscription")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              العودة لصفحة الباقات ←
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
