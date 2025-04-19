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
    <div className="card">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full bg-red-200"
        >
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your Name"
              type="text"
            />
          )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@example.com"
            type="email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Button type="submit">
            {isSignIn ? "Sign-In" : "Create an account"}
          </Button>
        </form>
      </Form>
      <div className="text-center">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <Link
          href={!isSignIn ? "sign-in" : "/sign-up"}
          className="font-bold text-primary ml-1"
        >
          {!isSignIn ? "Sign-In" : "Create an account"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
