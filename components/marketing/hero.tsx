import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="mx-auto w-full max-w-5xl mb-10">
            <div
                aria-hidden="true"
                className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block pointer-events-none"
            >
                <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict" />
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block pointer-events-none"
            >
                <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
                <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
            </div>


            <div className="relative flex flex-col items-center justify-center gap-5  pb-30">

                <p
                    className={cn(
                        "group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-2 shadow",
                        "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
                    )}
                >
                    <RocketIcon className="size-3 text-muted-foreground" />
                    <span className="text-sm">Ship Faster with this Kit!</span>
                </p>

                <h1
                    className={cn(
                        "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-3xl lg:text-4xl",
                        "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]"
                    )}
                >
                    Supabase X Capykits
                </h1>

                <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-md animate-in fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:text-lg ">
                    A modern Supabase starter kit to help you ship production-ready apps faster.
                </p>

                <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
                    <Button asChild className="rounded-sm" size="lg">
                      <Link href={'/'}>
                        Read Documentation{" "}
                        <ArrowRightIcon data-icon="inline-end" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
