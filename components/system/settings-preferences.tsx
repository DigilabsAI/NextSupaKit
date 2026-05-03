"use client";

import {
  Eye,
  Keyboard,
  Loader2,
  Palette,
  Save,
  Type,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export interface PreferencesData {
  theme: "light" | "dark" | "system";
  accentColor?: string;
  fontSize?: "small" | "medium" | "large";
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: "12h" | "24h";
  numberFormat?: string;
  density?: "compact" | "comfortable" | "spacious";
  animations?: boolean;
  reducedMotion?: boolean;
  highContrast?: boolean;
  screenReaderAnnouncements?: boolean;
  keyboardShortcuts?: boolean;
}

export interface SettingsPreferencesProps {
  preferences?: PreferencesData;
  onSave?: (data: PreferencesData) => Promise<void>;
  className?: string;
}

const accentColors = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "pink", label: "Pink", color: "bg-pink-500" },
];


const defaultPreferences: PreferencesData = {
  theme: "system",
  accentColor: "blue",
  fontSize: "medium",
  language: "en",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  numberFormat: "1,234.56",
  density: "comfortable",
  animations: true,
  reducedMotion: false,
  highContrast: false,
  screenReaderAnnouncements: true,
  keyboardShortcuts: true,
};

export default function SettingsPreferences({
  preferences = defaultPreferences,
  onSave,
  className,
}: SettingsPreferencesProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localPreferences, setLocalPreferences] =
    useState<PreferencesData>(preferences);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(localPreferences);
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreference = <K extends keyof PreferencesData>(
    key: K,
    value: PreferencesData[K]
  ) => {
    setLocalPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Preferences</CardTitle>
            <CardDescription className="wrap-break-word">
              Customize your app experience and appearance
            </CardDescription>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              className="w-full sm:w-auto"
              disabled={isSaving}
              onClick={handleSave}
              type="button"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="whitespace-nowrap">Saving…</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span className="whitespace-nowrap">Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Appearance Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Appearance</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Accent Color */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Palette className="size-4" />
                  </div>
                  <FieldLabel className="mb-0">Accent Color</FieldLabel>
                </div>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <button
                      aria-label={`Select ${color.label} accent color`}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full border-2 transition-all",
                        localPreferences.accentColor === color.value
                          ? "scale-110 border-primary ring-2 ring-primary/20"
                          : "border-muted hover:border-primary/50"
                      )}
                      key={color.value}
                      onClick={() =>
                        updatePreference("accentColor", color.value)
                      }
                      type="button"
                    >
                      <div className={cn("size-5 rounded-full", color.color)} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Type className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="font-size">
                    Font Size
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value: "small" | "medium" | "large") =>
                    updatePreference("fontSize", value)
                  }
                  value={localPreferences.fontSize}
                >
                  <SelectTrigger className="w-full" id="font-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>
          {/* Accessibility Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Eye className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Accessibility</h3>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Field>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Volume2 className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel className="mb-0" htmlFor="animations">
                        Animations
                      </FieldLabel>
                      <FieldDescription className="text-xs">
                        Smooth transitions
                      </FieldDescription>
                    </div>
                  </div>
                  <Switch
                    checked={localPreferences.animations}
                    id="animations"
                    onCheckedChange={(checked) =>
                      updatePreference("animations", checked)
                    }
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Eye className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel className="mb-0" htmlFor="reduced-motion">
                        Reduced Motion
                      </FieldLabel>
                      <FieldDescription className="text-xs">
                        Respect system preference
                      </FieldDescription>
                    </div>
                  </div>
                  <Switch
                    checked={localPreferences.reducedMotion}
                    id="reduced-motion"
                    onCheckedChange={(checked) =>
                      updatePreference("reducedMotion", checked)
                    }
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Eye className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel className="mb-0" htmlFor="high-contrast">
                        High Contrast
                      </FieldLabel>
                      <FieldDescription className="text-xs">
                        Better visibility
                      </FieldDescription>
                    </div>
                  </div>
                  <Switch
                    checked={localPreferences.highContrast}
                    id="high-contrast"
                    onCheckedChange={(checked) =>
                      updatePreference("highContrast", checked)
                    }
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Volume2 className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel className="mb-0" htmlFor="screen-reader">
                        Screen Reader
                      </FieldLabel>
                      <FieldDescription className="text-xs">
                        Enable announcements
                      </FieldDescription>
                    </div>
                  </div>
                  <Switch
                    checked={localPreferences.screenReaderAnnouncements}
                    id="screen-reader"
                    onCheckedChange={(checked) =>
                      updatePreference("screenReaderAnnouncements", checked)
                    }
                  />
                </div>
              </Field>

              <Field>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Keyboard className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <FieldLabel className="mb-0" htmlFor="keyboard-shortcuts">
                        Keyboard Shortcuts
                      </FieldLabel>
                      <FieldDescription className="text-xs">
                        Faster navigation
                      </FieldDescription>
                    </div>
                  </div>
                  <Switch
                    checked={localPreferences.keyboardShortcuts}
                    id="keyboard-shortcuts"
                    onCheckedChange={(checked) =>
                      updatePreference("keyboardShortcuts", checked)
                    }
                  />
                </div>
              </Field>
            </div>
          </div>
        </div>




      </CardContent>
    </Card>
  );
}
