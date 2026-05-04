import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function ItemFormSkeleton() {
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="space-y-3">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>


          {/* Empty slot to preserve grid balance */}
          <div className="hidden md:block" />

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-28 w-full" />
          </div>

          {/* Button */}
          <div className="flex justify-end md:col-span-2">
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}