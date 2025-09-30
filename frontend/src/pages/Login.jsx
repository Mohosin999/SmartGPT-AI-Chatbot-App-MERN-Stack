import React, { useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

import { clearError, loginUser } from "@/features/auth/authSlice";

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
 * Login Component
 * ----------------
 * A fully-featured login form with validation and Redux integration.
 *
 * Features:
 * 1. Validates email and password using Zod schema.
 * 2. Uses React Hook Form for state management and validation.
 * 3. Autofocuses the email input on mount.
 * 4. Handles login action via Redux dispatch.
 * 5. Reacts to auth state changes:
 *    - Displays toast notifications on success or error
 *    - Redirects to "/loading" after successful login
 *    - Clears auth errors after showing them
 * 6. Provides navigation to the registration page.
 *
 * Example Usage:
 * <Login />
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  const emailInputRef = useRef(null);

  // -----------------------------
  // React Hook Form setup
  // -----------------------------
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // -----------------------------
  // Autofocus on email input on first render
  // -----------------------------
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // -----------------------------
  // Watch for auth state changes
  // -----------------------------
  useEffect(() => {
    if (user) {
      toast.success("Login successful");
      form.reset();
      navigate("/loading");
    } else if (error) {
      toast.error("Invalid credentials");
      dispatch(clearError());
    }
  }, [user, error, form, navigate, dispatch]);

  // -----------------------------
  // Handlers
  // -----------------------------
  /**
   * Handle form submission and dispatch login action
   * @param {Object} values - Form values (email, password)
   */
  const handleLogin = useCallback(
    (values) => {
      dispatch(loginUser(values));
    },
    [dispatch]
  );

  /**
   * Navigate to registration page
   */
  const handleNavigateRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-950">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="flex flex-col gap-6"
              noValidate
            >
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
                        ref={emailInputRef}
                        type="email"
                        autoComplete="email"
                        placeholder="johndoe@example.com"
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
                        autoComplete="current-password"
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
                    "Login"
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline active:scale-95 transition cursor-pointer"
                    onClick={handleNavigateRegister}
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
