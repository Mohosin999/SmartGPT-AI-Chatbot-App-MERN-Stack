import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const nameRef = useRef(null); // Ref for name input

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  // Focus name input on page load
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (user) {
      form.reset();
    }
  }, [user, form]);

  const onSubmit = (values) => {
    dispatch(registerUser(values));
    toast.success("Registration successful");
    navigate("/loading");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to register a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Jhon Doe"
                        ref={nameRef} // <-- attach ref here
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="jhondoe@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer">
                  Register
                </Button>
                <p className="text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline cursor-pointer select-none active:scale-102"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </p>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
