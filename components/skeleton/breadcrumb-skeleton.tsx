import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export function BreadcrumbSkeleton() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {Array.from({ length: 3 }).map((_, index) => {
                    const isLast = index === 2;

                    return (
                        <div key={index} className="flex items-center text-xs">
                            <BreadcrumbItem>
                                <Skeleton
                                    className={`h-4 rounded ${index === 0
                                        ? "w-12"
                                        : index === 1
                                            ? "w-20"
                                            : "w-24"
                                        }`}
                                />
                            </BreadcrumbItem>

                            {!isLast && (
                                <BreadcrumbSeparator>
                                    <Skeleton className="h-3 w-3 rounded-sm" />
                                </BreadcrumbSeparator>
                            )}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}