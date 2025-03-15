"use client";

import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { signOut, checkUser } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();

      //   Router to signup page
      router.replace("/auth/signup");
    } catch (error) {
      console.error("Error during signing out!", error);
      toast.error("Error during signing out. Please try again later!");
    }
  };

  const isLoggedIn = async () => {
    try {
      await checkUser();
      return true;
    } catch (error) {
      console.error("Error", error);
      toast.error("Session Expired. Please login again!");
      // Redorect to signIn page
      router.replace("/auth/signup");
      return false;
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="w-full">
      <Navbar handleSignOut={handleSignOut} />
    </div>
  );
}
