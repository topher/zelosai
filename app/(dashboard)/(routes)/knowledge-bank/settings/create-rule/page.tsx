import { Separator } from "@/components/ui/separator"
import AccessRightsForm from "../components/rule-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Rule Management</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your data can be used by people and AI models.
        </p>
      </div>
      <Separator />
      <AccessRightsForm />
    </div>
  )
}
