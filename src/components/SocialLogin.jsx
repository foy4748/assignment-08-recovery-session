"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function SocialLogin() {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social(
      {
        provider: "google",
      },

      {
        onSuccess: (data) => {
          console.log(data);
          console.log("Google Login Success");
          router.push("/");
        },
        onError: (error) => {
          console.log("Google Login Failed");
          console.log(error);
        },
      },
    );
  };
  return <Button onClick={handleGoogleLogin}>Login with Google</Button>;
}
