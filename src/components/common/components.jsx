
export const getStatusBadge = (status) => {
  let className = ""
  if (["pending", "high", "open"].includes(status)) className = "bg-[#FFEEEE]"
  else if (["confirmed", "low", "closed"].includes(status)) className = "bg-[#D5F6E5]"
  else if (["medium"].includes(status)) className = "bg-[#fac9a9]"

  return (
    <div className={`p-1 border text-center rounded-full ${className}`}>
      {status}
    </div>
  )
}
