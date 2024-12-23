"use client";
import React, { useState } from "react";
import CustomButton from "@/components/common/CustomButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Axios from "@/libs/axios";
import { unsubscribeEmailURL } from "@/services/APIs/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

export default function Unsubscribed() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const query = searchParams.get("query") || "";
  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { data: res } = await Axios({ ...unsubscribeEmailURL, data: { query, ...data } });
      toast.success(res.message)
      router.push("/")
    } catch (error) {
      console.error("Error unsubscribing:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 md:py-10 md:px-10">
      <div className="text-center mb-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Unsubscribe from Our Emails!</h1>
        <p className="text-xl">
          We're sorry to see you go! By unsubscribing, you’ll no longer receive updates, offers, or news from us. If you
          change your mind, you’re always welcome to resubscribe.
        </p>
        <Link href={"/"}>
          <button className="text-primary mt-4 inline-flex gap-2 items-center">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back To Home
          </button>
        </Link>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg w-full max-w-3xl">
        <p className="text-center font-semibold text-gray-700 mb-4">
          To help us improve, please let us know the reason for unsubscribing.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="justify-items-center space-y-2">
            <div className="flex flex-col gap-3">
              {[
                { title: "I didn’t sign up for newsletters." },
                { title: "I receive too many emails." },
                { title: "The content is not relevant to me." },
                { title: "I no longer wish to receive promotional offers." },
                { title: "I'm not interested in updates or news." },
              ].map((item, index) => (
                <Controller
                  key={index}
                  name="reason"
                  control={control}
                  rules={{ required: "Please select a reason for unsubscribing." }}
                  render={({ field }) => (
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        {...field}
                        value={item.title}
                        className="radio"
                        checked={field.value === item.title}
                      />
                      <span className="text-gray-600">{item.title}</span>
                    </label>
                  )}
                />
              ))}
            </div>
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
          </div>
          <CustomButton type="submit" isLoading={isLoading} variant="secondary" className="mt-4 mx-auto" title="Unsubscribe" />
        </form>
      </div>
    </div>
  );
}
