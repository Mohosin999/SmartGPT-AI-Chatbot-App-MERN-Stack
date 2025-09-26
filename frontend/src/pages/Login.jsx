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
import { clearError, loginUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const emailRef = useRef(null); // Ref for email input

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // Focus email input on page load
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (user) {
      toast.success("Login successful");
      form.reset();
      navigate("/loading");
    } else if (error) {
      toast.error("Invalid credentials");
      dispatch(clearError());
    }
  }, [user, error, form, navigate]);

  const onSubmit = (values) => {
    dispatch(loginUser(values));
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login
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
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={emailRef} // <-- attach ref here
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
                  Login
                </Button>
                <p className="text-center">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline cursor-pointer select-none active:scale-102"
                    onClick={handleRegister}
                  >
                    Register
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

export default Login;
