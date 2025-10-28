import { useLoginMutation } from "@/app/api/auth-api";
import { loginSchema, type LoginFormData } from "@/validation/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";


const containerVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconVariants: any = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [
    loginMutation,
    { error: loginError, isLoading: loginLoading, isSuccess },
  ] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful! Welcome back 🎉");
      reset();
      navigate("/", { replace: true });
    } else if (loginError && "data" in loginError) {
      toast.error((loginError as any)?.data?.message || "Login failed!");
    }
  }, [isSuccess, navigate, reset, loginError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
    
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to={"/"}
          className="fixed top-6 left-6 border border-gray-200 bg-white/80 backdrop-blur-sm rounded-full p-2.5 cursor-pointer hover:bg-white hover:shadow-md transition-all duration-300 z-10 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </Link>
      </motion.div>

      {/* Login Form Card */}
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-[420px] w-[90%] max-w-md text-center border border-gray-200/60 rounded-3xl px-8 sm:px-10 bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-100/50 relative z-10"
      >
        {/* Header */}
        <div className="mt-10 mb-8">
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-900 text-3xl font-bold"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-500 text-sm mt-2"
          >
            Please sign in to continue to your account
          </motion.p>
        </div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-5"
        >
          <div
            className={`flex items-center w-full bg-white border ${
              errors.email ? "border-red-300" : "border-gray-200"
            } h-12 rounded-xl overflow-hidden px-4 gap-3 transition-all duration-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={errors.email ? "#ef4444" : "#9CA3AF"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-none outline-none ring-0 flex-1 text-sm text-gray-700 placeholder:text-gray-400"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs mt-2 text-left px-1 flex items-center gap-1.5"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Password Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-4"
        >
          <div
            className={`flex items-center w-full bg-white border ${
              errors.password ? "border-red-300" : "border-gray-200"
            } h-12 rounded-xl overflow-hidden px-4 gap-3 transition-all duration-200 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={errors.password ? "#ef4444" : "#9CA3AF"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="border-none outline-none ring-0 flex-1 text-sm text-gray-700 placeholder:text-gray-400"
              {...register("password")}
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs mt-2 text-left px-1 flex items-center gap-1.5"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        {/* Forgot Password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-6 text-right"
        >
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loginLoading}
          className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 flex items-center justify-center gap-2"
        >
          {loginLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </motion.button>

        {/* Sign Up Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-gray-600 text-sm mt-6 mb-10"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Login;
