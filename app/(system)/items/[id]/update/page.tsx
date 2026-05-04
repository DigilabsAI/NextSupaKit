import BookFormSkeleton from "@/components/skeleton/book-form-skeleton";
import ItemForm from "@/components/system/item-form";
import { Suspense } from "react";
import { getItemById } from "@/lib/actions/item";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <div>
      <Suspense fallback={<BookFormSkeleton />}>
        {params.then(({ id }) => (
          <Content id={id} />
        ))}
      </Suspense>
    </div>
  );
}

async function Content({ id }: { id: string }) {
  const item = await getItemById(id);

  if (!item) notFound();

  return (
    <ItemForm
      mode="update"
      defaultValues={{
        id: item.id,
        title: item.title,
        owner: item.owner,
        category: item.category,
        description: item.description ?? "",
      }}
    />
  );
}