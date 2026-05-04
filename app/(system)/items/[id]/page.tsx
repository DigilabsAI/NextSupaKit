import Link from "next/link";
import { Suspense } from "react";
import { getItemById } from "@/lib/actions/item";
import { notFound } from "next/navigation";
import { ItemContentSkeleton } from "@/components/skeleton/item-skeleton";

type PageProps = {
    params: Promise<{ id: string }>;
};

type ContentProps = {
    id: string;
};

export default function Page({ params }: PageProps) {
    return (
        <Suspense fallback={<ItemContentSkeleton />}>
            {params.then(({ id }) => (
                <ItemContent id={id} />
            ))}
        </Suspense>
    );
}

async function ItemContent({ id }: ContentProps) {
    const item = await getItemById(id);

    if (!item) notFound();

    return (
        <div className="space-y-4 p-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <Link
                    href={`/items/${item.id}/update`}
                    className="inline-flex rounded-md border px-4 py-2 text-sm font-medium"
                >
                    Update Item
                </Link>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
                <p>
                    <strong>Owner:</strong> {item.owner}
                </p>

                <p>
                    <strong>Category:</strong> {item.category}
                </p>

                {item.description && (
                    <p>
                        <strong>Description:</strong> {item.description}
                    </p>
                )}
            </div>


        </div>
    );
}