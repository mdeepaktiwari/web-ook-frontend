import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { subscribeWebhook } from "../services/webhook";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import { UserLogout } from "../component/UserLogout";

const schema = z.object({
  source: z
    .string()
    .url({ message: "Source must be a valid URL" })
    .min(1, { message: "Source is required" }),
  callback: z
    .string()
    .url({ message: "Callback must be a valid URL" })
    .min(1, { message: "Callback is required" }),
});

const CreateWebhook = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await subscribeWebhook(data);
      toast.success("Webhook created successfully");
      reset();
    } catch (error) {
      console.log(`Error in creating webhook: ${error}`);
      toast.error("Unable to create webhook. Please try again later");
    }
  };

  useEffect(() => {
    if (!isLoggedIn() && !isLoading) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen">
      <UserLogout />
      <div className="flex items-center justify-center mt-4 h-screen w-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:w-2/5 sm:w-3/5 w-full shadow-xl p-8 sm:p-12 mx-4 md:p-16"
        >
          <h1 className="text-center text-2xl md:text-3xl">CREATE WEBHOOK</h1>
          <div>
            <input
              className="border w-full outline-none rounded-none px-4 py-2 h-12 border-slate-300 mt-8"
              {...register("source")}
              placeholder="Source"
            />
            {errors.source && (
              <p className="text-rose-700">{errors.source.message}</p>
            )}
          </div>
          <div>
            <input
              className="border w-full outline-none rounded-none px-4 py-2 h-12 border-slate-300 mt-8"
              type="callback"
              {...register("callback")}
              placeholder="Callback"
            />
            {errors.callback && (
              <p className="text-rose-700">{errors.callback.message}</p>
            )}
          </div>
          <button
            className="w-full bg-black text-white tracking-widest h-12 px-4 mt-12"
            type="submit"
          >
            CREATE WEBHOOK
          </button>
          <div className="mt-4 text-center text-slate-600 no-underline">
            <Link
              to="/"
              className="text-blue-500 border-b border-b-blue-500 no-underline"
            >
              Show all webhooks
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWebhook;
