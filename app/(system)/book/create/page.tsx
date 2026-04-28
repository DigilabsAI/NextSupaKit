import AddBookForm from "@/components/system/add-book-form";

export default function page() {
  return (
    <div>
      <AddBookForm mode="create"
        onSubmit={createBook} />
    </div>
  )
}
