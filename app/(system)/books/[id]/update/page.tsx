import BookFormSkeleton from "@/components/skeleton/book-form-skeleton";
import BookForm from "@/components/system/book-form";
import { Suspense } from "react";

export default function page() {



  return (
   <div>
       <div>
           <Suspense fallback={<BookFormSkeleton/>}>
          <BookForm mode="update" />
          </Suspense>
        </div>
   </div>
  )
}
