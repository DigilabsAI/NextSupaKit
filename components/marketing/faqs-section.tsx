import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqsSection() {
    return (
        <div className="mx-auto w-full max-w-2xl space-y-7 px-4 my-10">
            <div className="space-y-2">
                <h2 className="font-semibold text-xl md:text-2xl text-center">
                    Next Steps
                </h2>
                <p className="max-w-2xl px-10 md:px-20 text-muted-foreground text-center text-base">
                    Everything you need to know about Supabase X Capykits and how to use it
                    to build and ship faster.
                </p>
            </div>
            <Accordion className="rounded-none border" collapsible type="single">
                {questions.map((item) => (
                    <AccordionItem className="px-4" key={item.id} value={item.id}>
                        <AccordionTrigger className="py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
                            {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4! text-muted-foreground">
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

const questions = [
  {
    id: "item-1",
    title: "Setup Environment Variables",
    content:
      "Configure your Supabase URL and anon key in your environment variables to enable authentication and database access.",
  },
  {
    id: "item-2",
    title: "Read the Docs",
    content:
      "Follow the documentation to understand the project structure, Supabase integration, and how to extend the starter kit.",
  },
  {
    id: "item-3",
    title: "Customize to Your Needs",
    content:
      "Modify components, styles, and database logic to match your product requirements and design preferences.",
  },
  {
    id: "item-4",
    title: "Get Support",
    content:
      "If you run into issues, check the docs or reach out through the provided support channels for help.",
  },
];