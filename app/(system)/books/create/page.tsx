import BookFormSkeleton from "@/components/skeleton/book-form-skeleton";
import AddBookForm from "@/components/system/book-form";
import { Suspense } from "react";

export default function page() {

  

  return (
    <div>
      <Suspense fallback={<BookFormSkeleton/>}>
        <AddBookForm mode="create" />
      </Suspense>
    </div>
  )
}
