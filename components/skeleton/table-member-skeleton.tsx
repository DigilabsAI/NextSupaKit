import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableMembersSkeleton() {
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* Header */}
                <div className="flex items-end justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <TableRow key={i}>
                                    {/* Member */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-9 w-9 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-40" />
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Contact */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-24" />
                                    </TableCell>

                                    {/* Gender */}
                                    <TableCell>
                                        <Skeleton className="h-6 w-16 rounded-md" />
                                    </TableCell>

                                    {/* Role */}
                                    <TableCell>
                                        <Skeleton className="h-8 w-24 rounded-md" />
                                    </TableCell>

                                    {/* Joined */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell>
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </div>
    );
}