import UserGeneral from "@/components/system/account-settings";
import SettingsPreferences from "@/components/system/settings-preferences";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SettingsPage() {
  const tabs = [
    { name: "General", value: "general" },
    { name: "Preferences", value: "preferences" },
  ];

  return (
    <div className="w-full py-8">
      <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="general" className="gap-4">
          <TabsList className="h-fit! w-full rounded-none border-b bg-transparent p-0 sm:justify-start">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:border-primary rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none! dark:data-[state=active]:bg-transparent"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="general" className="mt-4">
            <UserGeneral />
          </TabsContent>

          <TabsContent value="preferences" className="mt-4">
            <SettingsPreferences />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}