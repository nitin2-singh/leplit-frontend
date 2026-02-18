import { axiosInstance } from "@/lib/axios";
import { clearAuthToken, setAuthToken } from "@/lib/cookie";
import { useAuthStore } from "@/store/auth.store";
import { AuthResponse, LoginPayload, SignupPayload } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSignup() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const res = await axiosInstance.post<AuthResponse>(
        "/auth/signup",
        payload,
      );
      return res.data;
    },
    onSuccess: (data) => {
      router.push("/projects");
      setUser(data.user);
      setAuthToken(data.token);
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        payload,
      );
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setAuthToken(data.token);
      router.push("/projects");
    },
  });
}

export function useMe() {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get<AuthResponse>("/auth/me");
      const user = res.data.user;
      if (user) {
        setUser(user);
      }
      return res.data;
    },
    staleTime: 5 * 60 * 60,
    retry: false,
  });
}

export function useLogout() {
  const router = useRouter();
  return () => {
    clearAuthToken();
    router.push("/login");
  };
}
