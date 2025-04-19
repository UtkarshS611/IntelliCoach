"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Zod and react-hook-form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Form components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import FormField from "./FormField/FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
    console.log(values);
  };

  const isSignIn = type === "sign-in";

  return (
    <section className="flex min-h-screen w-full px-4 py-16 md:py-32 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-auto h-fit w-full max-w-sm  rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="p-8 pb-6">
            <div className="text-center">
              {isSignIn ? (
                <h1 className="mb-1 mt-4 text-xl font-semibold">
                  Sign In to <span className="text-primary">Intellicoach</span>
                </h1>
              ) : (
                <h1 className="mb-1 mt-4 text-xl font-semibold">
                  Create a <span className="text-primary">Intellicoach</span> Account
                </h1>
              )}
              <p className="text-sm">
                {isSignIn
                  ? "Welcome back! Sign in to continue"
                  : "Welcome! Create an account to get started"}
              </p>
            </div>
            <hr className="my-4" />
            <div className="space-y-6">
              {!isSignIn && (
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Button className="w-full">
                {isSignIn ? "Sign In" : "Create an account"}
              </Button>
            </div>
          </div>

          <div className="bg-muted rounded-(--radius) border p-3">
            <p className="text-accent-foreground text-center text-sm">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <Button asChild variant="link" className="px-2">
                <Link href={!isSignIn ? "/sign-in" : "/sign-up"}>
                  {!isSignIn ? "Sign In" : "Create an account"}
                </Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AuthForm;
