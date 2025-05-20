// ** import components
import { Separator } from "@/components/ui/separator";
import { UpdatePasswordForm } from "./update-password-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Password Update</h3>
        <p className="text-muted-foreground text-sm">
          Change your password to keep your account secure.
        </p>
      </div>
      <Separator />
      <UpdatePasswordForm />
    </div>
  );
}
