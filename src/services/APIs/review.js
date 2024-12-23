export const userReviewListURL = {
  url: '/review/list',
  method: 'POST'
}

export const deleteUserReviewURL = id => ({
  url: `/review/${id}`,
  method: 'DELETE'
})

export const updateUserReviewURL = id => ({
  url: `/review/${id}`,
  method: 'PATCH'
})

export const getPropertyRatingsListURL = {
  url: `/property/review/list`,
  method: 'POST'
}
