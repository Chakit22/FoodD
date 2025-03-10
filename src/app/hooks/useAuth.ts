"use client";
import {
  signIn,
  signOut,
  signUp,
  resetPassword,
  confirmResetPassword,
  confirmSignUp,
  resendSignUpCode,
  getCurrentUser,
} from "aws-amplify/auth";

export const useAuth = () => {
  async function checkUser() {
    try {
      const user = await getCurrentUser();
      console.log("user :");
      console.log(user);
      return true;
    } catch (error) {
      console.error("Invalid session", error);
      return false;
    }
  }

  async function handleSignUp(email: string, password: string) {
    try {
      // Sends the confirmation code
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async function handleConfirmSignup(email: string, code: string) {
    try {
      console.log("email:");
      console.log(email);
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
    } catch (error) {
      console.error("Error Confirming signup:", error);
      throw error;
    }
  }

  async function handleResendSignUpCode(email: string) {
    try {
      await resendSignUpCode({
        username: email,
      });
    } catch (error) {
      console.error("Error resending sign up code:", error);
      throw error;
    }
  }

  async function handleSignIn(email: string, password: string) {
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      return isSignedIn;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  // Sends the code to the user's email
  async function handleForgotPassword(email: string) {
    try {
      await resetPassword({
        username: email,
      });
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

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  return {
    checkUser,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    forgotPassword: handleForgotPassword,
    confirmResetPassword: handleConfirmResetPassword,
    confirmSignUp: handleConfirmSignup,
    resendSignUpCode: handleResendSignUpCode,
  };
};
