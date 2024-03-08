import LoginPage from "@/views/pages/userAuth/LoginPage.vue";
import SignUp from "@/views/pages/userAuth/SignUp.vue";
import ForgotPassword from "@/views/pages/userAuth/ForgotPassword.vue";
import OTP from "@/views/pages/userAuth/OTP.vue";
import ResetPassword from "@/views/pages/userAuth/ResetPassword.vue";

const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
    meta: { requiresGuest: true },
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: { requiresGuest: true },
  },
  {
    path: "/otp",
    name: "OTP",
    component: OTP,
    meta: {
      requiresGuest: true,
      requiresForgotPassword: true,
      requiresSignUp: true,
    },
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    component: ResetPassword,
    meta: { requiresGuest: true, requiresOtp: true },
  },
];

export default authRoutes;
