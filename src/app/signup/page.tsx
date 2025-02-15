"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import ikon dari lucide-react
import signupAction from "./signUpAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup() {
  const [error, formAction, isPending] = useActionState(
    signupAction,
    undefined
  );
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {/* Username Field */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
                value={formData.username}
                onChange={handleChange}
              />
              {error?.includes("Username") && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {error?.includes("email") && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error?.includes("Password") && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Loading..." : "Signup"}
            </Button>
          </form>

          {/* Jika error tidak spesifik (misalnya error dari server), tampilkan di bawah form */}
          {error &&
            !error.includes("Username") &&
            !error.includes("email") &&
            !error.includes("Password") && (
              <p className="text-red-500 text-xs mt-3 text-center">{error}</p>
            )}

          <p className="text-xs text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Login here!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
