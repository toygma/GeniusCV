import {
  registerSchema,
  type RegisterFormData,
} from "@/validation/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useRegisterMutation } from "@/app/api/auth-api";

const containerVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const iconVariants: any = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
  },
};

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [
    registerMutation,
    { error: registerError, isLoading: registerLoading, isSuccess },
  ] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created successfully! 🎉");
      reset();
      navigate("/login", { replace: true });
    } else if (registerError && "data" in registerError) {
      toast.error((registerError as any)?.data?.message || "Signup failed!");
    }
  }, [isSuccess, registerError, navigate, reset]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error("Error Signup:", error);
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

      {/* Signup Form Card */}
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
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-500 text-sm mt-2"
          >
            Sign up to get started
          </motion.p>
        </div>

        {/* Name Input */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className={`w-full h-12 px-4 border ${
              errors.name ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full h-12 px-4 border ${
              errors.email ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-5 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={`w-full h-12 px-4 border ${
              errors.password ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerLoading}
          className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
        >
          {registerLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Login Link */}
        <p className="text-gray-600 text-sm mt-6 mb-10">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;
