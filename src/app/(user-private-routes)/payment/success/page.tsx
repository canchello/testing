"use client";

import CustomButton from "@/components/common/CustomButton";
import Axios from "@/libs/axios";
import { bookingConfirmationURL } from "@/services/APIs/booking";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
    const token = searchParams.get('token') || ''
    const session_id = searchParams.get('session_id') || ''
    const booking_id = searchParams.get('booking_id') || ''
    const router = useRouter();

    const fetchPaymentStatus = async()=>{
      try {
        const payload = {
            id: booking_id,
            sessionId: session_id,
            token:token 
        }
        const response = await Axios({...bookingConfirmationURL,data:{...payload}})
        if(response.data){
          toast.success("Booking Confirmed!")
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    useEffect(()=>{
      if(token){
        fetchPaymentStatus();
      }
    },[token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Success Icon */}
      <FontAwesomeIcon icon={faCheckCircle} size="3x" className="text-success" />

      {/* Success Message */}
      <h1 className="text-3xl font-bold mt-4 text-gray-800">Payment Successful!</h1>
      <p className="text-gray-600 text-lg mt-2">Thank you for your purchase.</p>

      {/* Next Steps */}
      <div className="mt-6 flex flex-col items-center space-y-2">
      <CustomButton
          title="Continue"
          className="bg-primary text-white px-3 py-1 rounded shadow transition"
          onClick={()=>router.push(`/booking/${booking_id}/confirmation`)} 
        />
        <p className="text-primary cursor-pointer hover:underline" onClick={()=>router.push("/hotels/stays")} >Return to Home</p>
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
