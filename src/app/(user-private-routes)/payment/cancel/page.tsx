"use client";

import CustomButton from "@/components/common/CustomButton";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function CancelTransaction() {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Cancel Icon */}
      <FontAwesomeIcon icon={faTimesCircle} size="3x" className="text-error" />

      {/* Cancel Message */}
      <h1 className="text-3xl font-bold mt-4 text-gray-800">Transaction Cancelled</h1>
      <p className="text-gray-600 text-lg mt-2">Your transaction was not completed.</p>

      {/* Next Steps */}
      <div className="mt-6 flex flex-col items-center space-y-2">
        <CustomButton
          title="Try Again"
          className="bg-error text-white px-3 py-1 rounded shadow transition"
          onClick={() => router.push("/checkout")}
        />
        <p
          className="text-primary cursor-pointer hover:underline"
          onClick={() => router.push("/")}
        >
          Return to Home
        </p>
      </div>

      {/* Support Contact */}
      <div className="mt-8 text-gray-600 text-center">
        <p>
          If you have any issues, feel free to{" "}
          <a href="/support" className="text-primary hover:underline">
            contact support
          </a>.
        </p>
      </div>
    </div>
  );
}
