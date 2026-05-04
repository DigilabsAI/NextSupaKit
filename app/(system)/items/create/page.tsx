import BookFormSkeleton from "@/components/skeleton/book-form-skeleton";
import ItemForm from "@/components/system/item-form";
import { Suspense } from "react";

export default function page() {



  return (
    <div>
      <Suspense fallback={<BookFormSkeleton />}>
        <ItemForm mode="create" />
      </Suspense>
    </div>
  )
}
