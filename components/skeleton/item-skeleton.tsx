import { Skeleton } from "@/components/ui/skeleton";

export function ItemContentSkeleton() {
    return (
        <div className="space-y-4 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-28 rounded-md" />
            </div>

            {/* Card */}
            <div className="rounded-lg border p-4 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-40" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </div>
        </div>
    );
}