// ** import components
import { Separator } from "@/components/ui/separator";
import { BrandSetting } from "./brand-setting";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Brand Settings </h3>
        <p className="text-muted-foreground text-sm">
        Upload your company logo and set the primary brand color for your account.
        </p>
      </div>
      <Separator />
      <BrandSetting />
    </div>
  );
}
