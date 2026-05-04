import { Skeleton } from "@/components/ui/skeleton";

export function ItemsSectionSkeleton() {
    return (
        <div className="space-y-4 p-6">
            {/* Title */}
            <Skeleton className="h-8 w-40" />

            {/* Item Cards */}
            <div className="grid gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border p-4 shadow-sm space-y-3"
                    >
                        <Skeleton className="h-6 w-52" />
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    );
}