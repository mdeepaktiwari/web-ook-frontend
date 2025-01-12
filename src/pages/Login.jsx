import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import { saveItemInLocalStorage } from "../utils";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { signUser, isLoggedIn, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      saveItemInLocalStorage("token", response.data.token);
      saveItemInLocalStorage("user", response.data.user);
      signUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.log(`Error in login: ${error}`);
      toast.error("Invalid credentials");
    }
  };

  useEffect(() => {
    if (isLoggedIn() && !isLoading) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center mt-4 h-screen w-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:w-2/5 sm:w-3/5 w-full shadow-xl p-8 sm:p-12 mx-4 md:p-16"
        >
          <h1 className="text-center text-4xl md:text-5xl">LOGIN</h1>
          <div>
            <input
              className="border w-full outline-none rounded-none px-4 py-2 h-12 border-slate-300 mt-8"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-rose-700">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              className="border w-full outline-none rounded-none px-4 py-2 h-12 border-slate-300 mt-8"
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-rose-700">{errors.password.message}</p>
            )}
          </div>
          <button
            className="w-full bg-black text-white tracking-widest h-12 px-4 mt-12"
            type="submit"
          >
            LOGIN
          </button>
          <div className="mt-4 text-center text-slate-600">
            Don't have an account?
            <Link
              className="text-blue-500 border-b border-b-blue-500 ms-2"
              to="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
