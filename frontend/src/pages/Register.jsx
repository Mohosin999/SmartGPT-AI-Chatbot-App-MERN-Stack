import React, { useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

import { registerUser, clearError } from "@/features/auth/authSlice";

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

/**
 * Register Component
 * -----------------
 * A registration form component with full validation and Redux integration.
 *
 * Features:
 * 1. Validates user inputs using Zod schema:
 *    - Name must be at least 3 characters
 *    - Email must be a valid email
 *    - Password must be at least 6 characters
 * 2. Uses React Hook Form for form state and validation.
 * 3. Autofocuses the name input field on first render.
 * 4. Handles registration via Redux dispatch:
 *    - Shows toast notifications for success or error
 *    - Redirects to "/loading" after successful registration
 *    - Clears auth errors automatically
 * 5. Provides navigation to login page for existing users.
 *
 * Example Usage:
 * <Register />
 */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  const nameInputRef = useRef(null);

  // -----------------------------
  // React Hook Form setup
  // -----------------------------
  const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  // -----------------------------
  // Autofocus on the name input field on first render
  // -----------------------------
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // -----------------------------
  // Watch auth state changes for success or error
  // -----------------------------
  useEffect(() => {
    if (user) {
      toast.success("Registration successful");
      form.reset();
      navigate("/loading");
    } else if (error) {
      toast.error(error || "Registration failed");
      dispatch(clearError());
    }
  }, [user, error, form, navigate, dispatch]);

  // -----------------------------
  // Handlers
  // -----------------------------
  /**
   * Handle registration form submission
   * @param {Object} values - Form values (name, email, password)
   */
  const handleRegister = useCallback(
    (values) => {
      dispatch(registerUser(values));
    },
    [dispatch]
  );

  /**
   * Navigate to the login page
   */
  const handleNavigateLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181818]">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="flex flex-col gap-6"
              noValidate
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="John Doe"
                        ref={nameInputRef}
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@example.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <CardFooter className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  ) : (
                    "Register"
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline active:scale-95 transition cursor-pointer"
                    onClick={handleNavigateLogin}
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
