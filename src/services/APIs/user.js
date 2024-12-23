// ********** Auth **********

export const loginURL = {
  url: '/authentication/login',
  method: 'POST'
}

export const registerURL = {
  url: '/authentication/signup',
  method: 'POST'
}

export const forgotPasswordURL = {
  url: '/authentication/forget-password',
  method: 'POST'
}

export const googleLoginURL = {
  url: '/authentication/google',
  method: 'GET'
}

export const resetPasswordURL = (userId, token) => {
  return {
    url: `authentication/reset-password/${userId}/${token}`,
    method: 'POST'
  }
}

export const fetchUserProfileURL = {
  url: '/authentication/profile-me',
  method: 'GET'
}

export const verifyOTP_URL = {
  url: '/authentication/verify-otp',
  method: 'POST'
}

export const logoutUserURL = {
  url: '/authentication/logout',
  method: 'POST'
}

export const logoutFromAllDevicesURL = {
  url: '/authentication/logout-from-all-device',
  method: 'POST'
}

export const SubscribeEmailURL = {
  url: '/subscription/create',
  method: 'POST'
}

export const unsubscribeEmailURL = {
  url: '/subscription/delete',
  method: 'POST'
}

export const setQueryURL = {
  url: '/query/create',
  method: 'POST'
}

export const changeUserPasswordURL = {
  url: '/authentication/change-password',
  method: 'POST'
}

export const getBookingListURL = {
  url: '/booking/list',
  method: 'POST'
}

export const cancelBookingURL = id => ({
  url: '/booking/cancel/' + id,
  method: 'PATCH'
})

export const createReviewURL = {
  url: '/property/review/create',
  method: 'POST'
}

export const fetchRoomListURL = {
  url: '/room-type/list',
  method: 'POST'
}

export const upgradeRoomURL = id => ({
  url: '/booking/upgrade/' + id,
  method: 'PATCH'
})

export const getTaxiBookingListURL = {
  url: '/taxi-booking/list',
  method: 'POST'
}
export const requestTaxiURL = {
  url: '/taxi-booking/create',
  method: 'POST'
}
