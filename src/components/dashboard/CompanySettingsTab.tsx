import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Moon,
  Globe,
  Shield,
  Building2,
  Save,
  Key,
  Mail,
  Smartphone,
  Pencil,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompanySettingsTab = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [notifications, setNotifications] = useState({
    newApplications: true,
    applicationUpdates: true,
    weeklyReport: false,
  });

  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveAccount = () => {
    setIsEditing(false);
    toast({ title: "تم الحفظ", description: "تم حفظ التغييرات بنجاح" });
  };

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <Card className="border-border">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center justify-start gap-2">
            <span>حساب الشركة</span>
            <Building2 className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-right">
            إدارة بيانات تسجيل الدخول للشركة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 text-right">
              <Label htmlFor="admin-name">اسم المسؤول</Label>
              <Input
                id="admin-name"
                placeholder="محمد أحمد"
                className="text-right disabled:opacity-70"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="admin-email">البريد الإلكتروني</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@company.com"
                className="text-left bg-muted text-muted-foreground cursor-not-allowed"
                dir="ltr"
                readOnly
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 text-right">
              <Label htmlFor="admin-phone">رقم الهاتف</Label>
              <Input
                id="admin-phone"
                type="tel"
                placeholder="+966 5XX XXX XXXX"
                className="text-left disabled:opacity-70"
                dir="ltr"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="admin-role">المسمى الوظيفي</Label>
              <Input
                id="admin-role"
                placeholder="مدير الموارد البشرية"
                className="text-right disabled:opacity-70"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex justify-start pt-2 gap-3">
            {isEditing ? (
              <>
                <Button onClick={handleSaveAccount} className="gap-2 flex-row-reverse">
                  <Save className="w-4 h-4" />حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2 flex-row-reverse">
                  <X className="w-4 h-4" />إلغاء
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2 flex-row-reverse">
                <Pencil className="w-4 h-4" />تعديل البيانات
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center justify-start gap-2">
            <span>الإشعارات</span>
            <Bell className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-right">
            تخصيص إشعارات البريد الإلكتروني والتطبيق
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="text-right flex-1">
              <Label className="text-base font-medium flex items-center justify-start gap-2">
                <span>طلبات توظيف جديدة</span>
                <Mail className="w-4 h-4 text-muted-foreground" />
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                إشعار عند تقدم مرشح جديد لإحدى وظائفكم
              </p>
            </div>
            <Switch
              checked={notifications.newApplications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newApplications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="text-right flex-1">
              <Label className="text-base font-medium flex items-center justify-start gap-2">
                <span>تحديثات الطلبات</span>
                <Smartphone className="w-4 h-4 text-muted-foreground" />
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                إشعارات عند تغير حالة المرشحين
              </p>
            </div>
            <Switch
              checked={notifications.applicationUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, applicationUpdates: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="text-right flex-1">
              <Label className="text-base font-medium">تقارير أسبوعية</Label>
              <p className="text-sm text-muted-foreground mt-1">
                تقرير أسبوعي بإحصائيات التوظيف وأداء الإعلانات
              </p>
            </div>
            <Switch
              checked={notifications.weeklyReport}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weeklyReport: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="border-border">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center justify-start gap-2">
            <span>اللغة</span>
            <Globe className="w-5 h-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-muted/30">
            <div className="text-right flex-1">
              <Label className="text-base font-medium">اللغة الحالية</Label>
              <p className="text-sm text-muted-foreground mt-1">العربية (Arabic)</p>
            </div>
            <Button variant="outline" size="sm">تغيير اللغة</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center justify-start gap-2">
            <span>الأمان</span>
            <Shield className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-right">
            إعدادات الأمان وحماية حساب الشركة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="text-right flex-1">
              <Label className="text-base font-medium">كلمة المرور</Label>
              <p className="text-sm text-muted-foreground mt-1">آخر تحديث منذ 30 يوماً</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 flex-row-reverse">
              <Key className="w-4 h-4" />تغيير
            </Button>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="text-right flex-1">
              <Label className="text-base font-medium">المصادقة الثنائية</Label>
              <p className="text-sm text-muted-foreground mt-1">أضف طبقة حماية إضافية لحساب الشركة</p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center justify-start gap-2 text-destructive">
            <span>منطقة الخطر</span>
            <Shield className="w-5 h-5" />
          </CardTitle>
          <CardDescription className="text-right">
            إجراءات لا يمكن التراجع عنها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-destructive/5">
            <div className="text-right flex-1">
              <Label className="text-base font-medium">حذف حساب الشركة نهائياً</Label>
              <p className="text-sm text-muted-foreground mt-1">
                سيتم حذف جميع بيانات الشركة والوظائف والطلبات بشكل نهائي
              </p>
            </div>
            <Button variant="destructive" size="sm">حذف الحساب</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettingsTab;
