export const ROUTES = {
  STAYS: '/stays',
  BLOGS: '/blogs',
  TAXI_SERVICE: '/taxi-service',
  FAQ: '/faq',
  TOP_HOTELS: '/top-hotels',
  ABOUT: '/about',
  CAREER: '/careers',
  CONTACT_US: '/contact-us',
  SEARCH_RESULTS: '/stays/search-results',
  HOTEL: {
    STAYS: '/hotels/stays',
    CAR_RENTAL: '/hotels/car-rental'
  },
  PROFILE: {
    PERSONAL_DETAILS: '/profile/personal-details',
    SECURITY: '/profile/security',
    PAYMENT_DETAILS: '/profile/payment-details',
    PREFERENCES: '/profile/preferences'
  },
  GUEST_DETAILS: '/guest-details',
  MY_BOOKINGS: '/my-bookings',
  MY_REVIEWS: '/reviews',
  MY_WISHLIST: '/wishlist',
  WALLET_REWARDS: '/wallet-and-rewards',
  CUSTOMER_SUPPORT: '/support',
  CREATE_RAISE_TICKET: '/support/raise-ticket'
}

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  VENDOR: 'vendor'
}

export const PROFILE_STATUS = {
  PENDING: 'pending',
  COMPLETE: 'complete'
}

export const LOGGED_USER_PROVIDER_TYPE = {
  google: 'google',
  password: 'password'
}

export const languages = {
  ENGLISH: 'english',
  ARABIC: 'arabic'
}

// Define the structure of the countries object
export const countries: Record<string, string> = {
  NEW_YORK: 'New York',
  USA: 'USA',
  INDIA: 'India',
  LIBYA: 'Libya'
}

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  FAILED: 'failed'
}

export const BOOKING_REFUND_METHOD = {
  LIBUTEL_WALLET: 'libutel_wallet',
  BANK: 'bank_account'
}

export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;