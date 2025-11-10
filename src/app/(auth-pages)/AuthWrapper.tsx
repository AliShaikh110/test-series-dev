"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  redirectTo?: string;
};

export function ProtectedRoute({
  children,
  loadingComponent = <div>Loading...</div>,
  redirectTo = "/sign-in",
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { authenticated } = await checkAuth();
        setIsAuthenticated(authenticated);

        if (!authenticated) {
          router.replace(redirectTo);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.replace(redirectTo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [redirectTo, router]);

  if (isLoading) {
    return loadingComponent;
  }

  return isAuthenticated ? children : null;
}
