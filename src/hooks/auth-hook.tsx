"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAuthStatus } from "@/data/actions/auth";
import { User } from "@/types/auth";

type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: Error | null;
};

type UseAuthOptions = {
  protectedRoute?: boolean;
  redirectTo?: string;
  onAuthResolved?: (authenticated: boolean, user: User | null) => void;
  skipRedirect?: boolean;
};

export function useAuth({
  protectedRoute = false,
  redirectTo,
  onAuthResolved,
  skipRedirect = false,
}: UseAuthOptions = {}) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null,
  });

  // Extract checkAuthentication to be reusable
  const checkAuthentication = useCallback(async () => {
    try {
      const { authenticated, user } = await getAuthStatus();

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: authenticated,
        user,
        loading: false,
        error: null,
      }));

      onAuthResolved?.(authenticated, user);

      if (!skipRedirect) {
        if (protectedRoute && !authenticated) {
          router.replace(redirectTo || "/sign-in");
        } else if (!protectedRoute && authenticated) {
          router.replace(redirectTo || "/dashboard");
        }
      }

      return { authenticated, user };
    } catch (error) {
      console.error("Auth check error:", error);

      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));

      if (!skipRedirect && protectedRoute) {
        router.replace("/sign-in");
      }

      throw error;
    }
  }, [protectedRoute, redirectTo, router, onAuthResolved, skipRedirect]);

  // Add revalidate function
  const revalidate = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      const { authenticated, user } = await checkAuthentication();
      return { authenticated, user };
    } catch (error) {
      console.error("Revalidation error:", error);
      throw error;
    }
  }, [checkAuthentication]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (mounted) {
        await checkAuthentication();
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [checkAuthentication]);

  const { loading, isAuthenticated, user, error } = authState;


  return {
    loading,
    isAuthenticated,
    user,
    error,
    authState,
    revalidate, // Export the revalidate function
  };
}
