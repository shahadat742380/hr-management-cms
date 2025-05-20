// ** import components
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Profile</h3>
        <p className="text-muted-foreground text-sm">
          Update your name, contact, and profile photo.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
