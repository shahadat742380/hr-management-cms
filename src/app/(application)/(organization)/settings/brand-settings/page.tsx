// ** import components
import { Separator } from "@/components/ui/separator";
import { AccountSetting } from "./account-setting";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Account Settings </h3>
        <p className="text-muted-foreground text-sm">
          Manage your account preferences and settings.
        </p>
      </div>
      <Separator />
      <AccountSetting />
    </div>
  );
}
