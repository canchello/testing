export const createWishListURL = {
  url: '/wishlist/create',
  method: 'POST'
}

export const wishlistListingURL = {
  url: '/wishlist/list',
  method: 'POST'
}

export const deleteWishListURL = id => ({
  url: `/wishlist/${id}`,
  method: 'DELETE'
})

export const addPropertyIntoWishListURL = wishListId => ({
  url: `/wishlist/add/${wishListId}`,
  method: 'PATCH'
})

export const removePropertyFromWishListURL = wishListId => ({
  url: `/wishlist/remove/${wishListId}`,
  method: 'PATCH'
})
