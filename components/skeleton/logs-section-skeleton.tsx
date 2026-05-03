import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsActivityLogSkeleton() {
  return (
    <Card className="w-full shadow-xs">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left Filter Card */}
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />

              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Right Filter Card */}
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />

              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Stats + Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
          </div>

          <Separator />

          {/* Activity Entries */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <Skeleton className="size-8 shrink-0 rounded-lg" />

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}