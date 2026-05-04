// Book's Server Actions
"use server";

import { ItemFormValues } from "@/lib/schema/item";
import { createClient } from "@/lib/supabase/server";
import { console } from "inspector";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitItem(values: ItemFormValues) {
    // console.log("Submitting new item:", values);
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    const userId = data?.user?.id;

    if (error) {
        redirect("/auth/login");
    }

    if (!values.id) {

        const { error } = await supabase
            .from("items")
            .insert([
                {
                    title: values.title,
                    owner: userId,
                    category: values.category,
                    description: values.description ?? null,
                },
            ])
            .select()
            .single();



        if (error) {
            console.log("Error:", error);
            throw new Error(error.message);
        } else {
            revalidatePath("/items");
            redirect("/items");
        }
    }
}

export async function updateItem(values: ItemFormValues) {
    const supabase = await createClient();
    if (!values.id) {
        const { error } = await supabase
            .from("items")
            .update({
                title: values.title,
                owner: values.owner,
                category: values.category,
                description: values.description ?? null,
            })
            .eq("id", values.id)
            .select()
            .single();

        if (error) {
            console.log("Error:", error);
            throw new Error(error.message);
        } else {
            revalidatePath("/items");
            redirect("/items");
        }
    }
}

export async function getAllItems(): Promise<ItemFormValues[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data ?? [];
}

export async function getItemById(id: string): Promise<ItemFormValues | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        // Supabase throws error if not found, so we normalize it
        if (error.code === "PGRST116") return null;
        throw new Error(error.message);
    }

    return data;
}