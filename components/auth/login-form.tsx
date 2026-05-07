"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginVariant = "email" | "username" | "oauth";

type LoginFormProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: LoginVariant;
};

export function LoginForm({
  className,
  variant = "email",
  ...props
}: LoginFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });

    if (error) setError(error.message);
    else router.push("/dashboard");

    setIsLoading(false);
  }

  async function handleUsernameLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data, error: userError } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", identifier)
      .single();

    if (userError || !data) {
      setError("Username not found");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });

    if (error) setError(error.message);
    else router.push("/dashboard");

    setIsLoading(false);
  }

  async function handleOAuth(provider: "github" | "google") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  const isForm = variant === "email" || variant === "username";

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {variant === "email" && "Login with email and password"}
            {variant === "username" && "Login with username and password"}
            {variant === "oauth" && "Login with GitHub or Google"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isForm ? (
            <form
              onSubmit={
                variant === "email"
                  ? handleEmailLogin
                  : handleUsernameLogin
              }
              className="space-y-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="identifier">
                  {variant === "email" ? "Email" : "Username"}
                </Label>

                <Input
                  id="identifier"
                  type={variant === "email" ? "email" : "text"}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          ) : (
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => handleOAuth("github")}
              >
                Continue with GitHub
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleOAuth("google")}
              >
                Continue with Google
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}