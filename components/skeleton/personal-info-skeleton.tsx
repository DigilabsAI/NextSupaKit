import { Skeleton } from "@/components/ui/skeleton";

export function PersonalInfoSkeleton() {
    return (
        <div className="space-y-6">
            {/* MAIN SECTION */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start py-4">

                {/* AVATAR */}
                <div className="flex flex-col items-center gap-3 w-full lg:w-auto">
                    <Skeleton className="size-24 sm:size-28 rounded-full" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>

                {/* FORM FIELDS */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>

            {/* SEPARATOR */}
            <Skeleton className="h-px w-full" />

            {/* ACTION BUTTON */}
            <div className="flex justify-end">
                <Skeleton className="h-10 w-40 rounded-md" />
            </div>
        </div>
    );
}