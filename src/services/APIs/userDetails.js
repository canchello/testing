// User Profile Update URL
export const updateUserProfileURL = {
  url: '/user/',
  method: 'PATCH'
}

//PASSPORT RELATED URLs
export const addUserPassportDataURL = {
  url: '/passport/create',
  method: 'POST'
}

export const getUserPassportDetailsURL = {
  url: '/passport/',
  method: 'GET'
}

export const updateUserPassportDetailsURL = {
  url: '/passport/',
  method: 'PATCH'
}

//PAYMENT/CARD RELATED URLs

export const addUserCardDetailsURL = {
  url: '/bank-detail/create',
  method: 'POST'
}

export const updateUserCardDetailsURL = id => ({
  url: `/bank-detail/${id}`,
  method: 'PATCH'
})

export const userCardDetailsURL = {
  url: `/bank-detail/list/`,
  method: 'POST'
}

export const deleteUserCardDetailURL = id => ({
  url: `bank-detail/${id}`,
  method: 'DELETE'
})
