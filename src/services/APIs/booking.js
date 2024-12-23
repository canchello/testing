export const createNewBookingURL ={
    url:'/booking/create',
    method:"POST"
}

export const updateUserBookingURL = (bookingId)=>({
    url:`/booking/${bookingId}`,
    method:"PATCH"
})

export const fetchUserBookingListURL = {
    url:"/booking/list",
    method:"POST"
}

export const bookingURL = {
    url:"/booking/create-checkout-session",
    method:"POST"
}

export const bookingConfirmationURL = {
    url:"/booking/confirmed",
    method:"POST"
}