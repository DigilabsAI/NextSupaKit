import { getAllItems } from "@/lib/actions/item";
import Link from "next/link";
import { Suspense } from "react";

export default function ItemsPage() {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ItemsSection />
    </Suspense>
  );
}

export async function ItemsSection() {
  const items = await getAllItems();
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Item List</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">No items found.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Link
              href={`/items/${item.id}`}
              key={item.id}
              className="rounded-lg border p-4 shadow-sm space-y-2"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-muted-foreground">
                Owner: {item.owner}
              </p>
              <p className="text-sm">Category: {item.category}</p>

              {item.description && (
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}