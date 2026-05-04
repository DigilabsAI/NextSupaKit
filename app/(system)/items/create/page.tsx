import ItemFormSkeleton from "@/components/skeleton/item-form-skeleton";
import ItemForm from "@/components/system/item-form";
import { Suspense } from "react";

export default function page() {



  return (
    <div>
      <Suspense fallback={<ItemFormSkeleton />}>
        <ItemForm mode="create" />
      </Suspense>
    </div>
  )
}
