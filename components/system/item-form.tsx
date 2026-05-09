"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ItemFormValues, ItemSchema } from "@/lib/zod-schema/item";
import { submitItem, updateItem } from "@/lib/actions/item";


type ItemFormProps = {
  mode?: "create" | "update";
  defaultValues?: Partial<ItemFormValues>;
};

export default function ItemForm({
  mode = "create",
  defaultValues,
}: ItemFormProps) {
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      id: defaultValues?.id || "",
      title: defaultValues?.title || "",
      owner: defaultValues?.owner || "",
      category: defaultValues?.category || "",
      description: defaultValues?.description || "",
    },
  });


  async function handleSubmit(values: ItemFormValues) {
    if (mode === "create") {
      await submitItem(values);
    } else {
      await updateItem(values);
    }
  }


  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Add New Item" : "Update Item"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Fill in the details to add a new item."
            : "Update item information."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">
                {mode === "create" ? "Add Item" : "Update Item"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}