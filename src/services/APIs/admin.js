export const adminUserListURL = {
  url: '/admin/user/list',
  method: 'POST'
}

export const getUserDataURL = id => ({
  url: `/admin/user/${id}`,
  method: 'GET'
})

export const ownerListURL = {
  url: `/admin/owner/list`,
  method: 'POST'
}

export const getOwnerDataURL = id => ({
  url: `/admin/owner/${id}`,
  method: 'GET'
})

export const getOwnerRoomListURL = id => ({
  url: `/admin/owner/rooms/list/${id}`,
  method: 'POST'
})

export const getAdminBookingURL = bookingId => ({
  url: `/admin/booking/${bookingId}`,
  method: 'GET'
})

export const getOwnerBookingListURL = {
  url: `/admin/booking/list`,
  method: 'POST'
}

export const getSupportTicketsListURL = {
  url: `/admin/support/list`,
  method: 'POST'
}

export const notificationListURL = {
  url: `/admin/campaign/list`,
  method: 'POST'
}

export const notificationPushURL = {
  url: `/admin/campaign/push-notification`,
  method: 'POST'
}

export const emailCompaignURL = {
  url: `/admin/campaign/push-email`,
  method: 'POST'
}

export const couponListURL = {
  url: `/admin/coupon/list`,
  method: 'POST'
}

export const createCouponURL = {
  url: `/admin/coupon/create`,
  method: 'POST'
}

export const deleteCouponURL = id => ({
  url: `/admin/coupon/${id}`,
  method: 'DELETE'
})

export const updateCouponURL = id => ({
  url: `/admin/coupon/${id}`,
  method: 'PATCH'
})

export const updateReferralBonusURL = {
  url: `/admin/referral/update`,
  method: 'POST'
}

export const getReferralURL = {
  url: `/admin/referral/get`,
  method: 'POST'
}

export const listTaxiBookingsURL = {
  url: `/admin/taxi-booking/list`,
  method: 'POST'
}

export const assignTaxiDriverURL = id => ({
  url: `/admin/taxi-booking/assign-driver/${id}`,
  method: 'PATCH'
})

export const suspendAccountURL = {
  url: `/admin/user/suspend`,
  method: 'POST'
}

export const deleteAccountURL = {
  url: `/admin/user/delete`,
  method: 'POST'
}

export const listBlogURL = {
  url: `/admin/blog/list`,
  method: 'POST'
}

export const createBlogURL = {
  url: `/admin/blog/create`,
  method: 'POST'
}

export const getBlogURL = id => ({
  url: `/admin/blog/${id}`,
  method: 'GET'
})

export const updateBlogURL = id => ({
  url: `/admin/blog/${id}`,
  method: 'PATCH'
})

export const deleteBlogURL = id => ({
  url: `/admin/blog/${id}`,
  method: 'DELETE'
})

export const getPropertyApproveURL = propertyId => ({
  url: `/admin/owner/property/approve/${propertyId}`,
  method: 'POST'
})

export const getPropertyRejectURL = propertyId => ({
  url: `/admin/owner/property/reject/${propertyId}`,
  method: 'POST'
})
