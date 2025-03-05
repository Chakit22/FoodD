import {
  AuthUser,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function checkUser() {
    try {
      const user = await getCurrentUser();
      console.log("user :");
      console.log(user);
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error("Invalid session", error);
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }

  async function handleSignIn(email: string, password: string) {
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        await checkUser();
      }
      return isSignedIn;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  async function handleSignUp(email: string, password: string) {
    try {
      const { isSignUpComplete } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      return isSignUpComplete;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  // Sends the code to the user's email
  async function handleForgotPassword(email: string) {
    try {
      const output = await resetPassword({
        username: email,
      });

      const { nextStep } = output;
      switch (nextStep.resetPasswordStep) {
        case "CONFIRM_RESET_PASSWORD_WITH_CODE":
          const codeDeliveryDetails = nextStep.codeDeliveryDetails;
          console.log(
            `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
          );
          // Collect the confirmation code from the user and pass to confirmResetPassword.
          break;
        case "DONE":
          console.log("Successfully reset password.");
          break;
      }
    } catch (error) {
      console.error("Error Resetting password!", error);
      throw error;
    }
  }

  // Verifies the code and resets the password
  async function handleConfirmResetPassword(
    email: string,
    code: string,
    newPassword: string
  ) {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword,
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    forgotPassword: handleForgotPassword,
    confirmResetPassword: handleConfirmResetPassword,
  };
};
