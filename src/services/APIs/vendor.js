import LOCAL_STORAGE_CONSTANTS from '@/constants/localstorage'
export const designationListURL = {
  url: '/vendor/designation/list',
  method: 'POST'
}

export const createPropertyURL = {
  url: '/vendor/property/create',
  method: 'POST'
}

export const updatePropertyURL = id => ({
  url: `/vendor/property/${id}`,
  method: 'PATCH'
})

export const updatePropertyRulesURL = {
  url: `/vendor/property-rule/createBulk`,
  method: 'POST'
}

export const facilityListURL = {
  url: '/property-item/list',
  method: 'POST'
}

export const attachmentCreateURL = {
  url: '/vendor/attachment/create',
  method: 'POST'
}

export const attachmentUploadURL = {
  url: '/vendor/attachment/upload',
  method: 'POST'
}

export const createBankDetailsURL = {
  url: `/vendor/bank-detail/upsert`,
  method: 'POST'
}

export const bankDetailsURL = {
  url: `/vendor/bank-detail/get`,
  method: 'POST'
}

export const vendorPropertyUpdateURL = id => ({
  url: `/vendor/property/${id}`,
  method: 'PATCH'
})

export const vendorBookingList = {
  url: '/vendor/booking/list',
  method: 'POST'
}

export const vendorRoomsList = {
  url: '/vendor/room-type/list',
  method: 'POST'
}

export const vendorReviewList = {
  url: '/vendor/review/list',
  method: 'POST'
}

export const ruleListURL = {
  url: `/vendor/property-rule/list`,
  method: 'POST'
}

export const policyListURL = {
  url: `/vendor/property-policy/list`,
  method: 'POST'
}

export const verifyOTPURL = {
  url: `/authentication/verify-otp`,
  method: 'POST'
}

export const sendOTPURL = {
  url: `/authentication/otp/send`,
  method: 'POST'
}

export const getChatListURL = {
  url: '/chat/list',
  method: 'POST'
}

export const readChatMessages = {
  url: '/chat/read',
  method: 'POST'
}

export const getChatMessages = {
  url: '/chat/message/list',
  method: 'POST'
}

export const sendChatMessage = {
  url: '/chat/message/send',
  method: 'POST'
}

export const createChatURL = {
  url: '/chat/create',
  method: 'POST'
}

export const cancelBookingURL = id => ({
  url: `/vendor/booking/cancel/${id}`,
  method: 'POST'
})

export const listenChatMethod = () => {
  let token = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN)
  return {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
}
