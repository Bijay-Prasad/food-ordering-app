"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "@/lib/slices/auth-slice";
// import { users } from "@/lib/mock-data";
import { RootState } from "@/lib/store";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) router.push("/restaurants");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      setIsLoading(false);
      // router.push('/restaurants');

      // if (!user) {
      //   toast.error("Invalid email or password");
      //   setIsLoading(false);
      //   return;
      // }

      // const { password: _, ...userWithoutPassword } = user;
      // dispatch(
      //   login({
      //     user: userWithoutPassword as any,
      //     token: `token_${user.id}_${Date.now()}`,
      //   })
      // );

      toast.success(`Welcome back, ${user.name}!`);
      router.push("/restaurants");
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-neutral-900">FoodHub</span>
          </div>
          {/* <h1 className="text-4xl font-bold text-primary mb-2">Slooze</h1>
          <p className="text-neutral-600">Food Ordering System</p> */}
        </div>
        {/* <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-2xl font-bold text-neutral-900">FoodHub</span>
        </Link> */}

        {/* Login Card */}
        <div className="card bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nick@foodhub.com"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm font-medium text-neutral-900 mb-3">
              Demo Credentials:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-neutral-600">
                <span className="font-medium text-neutral-900">Admin:</span>{" "}
                nick@foodhub.com / admin123
              </p>
              <p className="text-neutral-600">
                <span className="font-medium text-neutral-900">Manager:</span>{" "}
                marvel@foodhub.com / manager123
              </p>
              <p className="text-neutral-600">
                <span className="font-medium text-neutral-900">Member:</span>{" "}
                thanos@foodhub.com / member123
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
