import SettingsPreferences from "@/components/ui/settings-preferences";

export default function SettingsPage() {
    return (
        <div>
            <SettingsPreferences
                preferences={{
                    theme: "dark",
                    language: "en",
                    timezone: "America/Los_Angeles",
                    fontSize: "medium",
                }}
                
            />
        </div>
    )
}
