export const ROUTES = {
  STAYS: '/stays',
  BLOGS: '/blogs',
  TAXI_SERVICE: '/taxi-service',
  FAQ: '/faq',
  TOP_HOTELS: '/top-hotels',
  ABOUT: '/about',
  CAREER: '/careers',
  MESSAGES: '/messages',
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
  CREATE_RAISE_TICKET: '/support/raise-ticket',
  VENDOR: {
    ROOT: '/vendor',
    LOGIN: '/vendor/login',
    ONBOARD: '/vendor/onboard',
    DASHBOARD: '/vendor/dashboard',
    MESSAGES: '/vendor/messages',
    RESERVATIONS: '/vendor/reservations'
  },
  ADMIN: {
    ROOT: '/admin',
    LOGIN: '/admin/login',
    ONBOARD: '/admin/onboard',
    USER_MANAGEMENT: '/admin/user-management',
    OWNERS: '/admin/owners',
    BOOKINGS: '/admin/bookings',
    PAYMENT_FINANCE: '/admin/payment-finance',
    PLATFORM_ANALYTICS: '/admin/platform-analytics',
    CMS: '/admin/cms',
    MARKETING: '/admin/marketing',
    NOTIFICAION: '/admin/notification',
    TAXI_BOOKINGS: '/admin/taxi-bookings',
    SUPPORT: '/admin/support'
  }
}

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CAR_OWNER: 'car_owner'
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

export const facilityTypes = {
  FACILITY: 'facility',
  AMENITY: 'amenity',
  FEATURE: 'feature'
}

export const POLICY = {
  CANCELLATION_POLICY: 'cancellation_policy'
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

export const USER_STATUS = {
  DELETED: 'deleted',
  SUSPENDED: 'suspended'
}

export const FACILITY_FILTER_PRICE_RANGE = [
  {
    title: 'Less then 50$',
    value: [null, 50]
  },
  {
    title: '50$ to 100$',
    value: [50, 100]
  },
  {
    title: '100$ to 150$',
    value: [100, 150]
  },
  {
    title: '150$ to more',
    value: [150, null]
  }
]

export const BOOKING_REFUND_METHOD = {
  LIBUTEL_WALLET: 'libutel_wallet',
  BANK: 'bank_account'
}

export const BED_TYPES = {
  SINGLE: 'SINGLE_BED',
  SINGLE_BED: 'SINGLE_BED',
  KING_SIZE_BED: 'KING_SIZE_BED',
  BUNK_BED: 'BUNK_BED'
}

export const BANK_ACCOUNT_TYPES = {
  SAVING: 'SAVING',
  CURRENT: 'CURRENT'
}
export const PAYMENT_METHOD = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  NET_BANKING: 'net_banking',
  DEBIT_CREDIT_CARD: 'debit_credit_card'
}

export const PAYMENT_STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending'
}
export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export const cities = [
  { label: 'Tripoli', value: 'tripoli' },
  { label: 'Ajdabiya', value: 'ajdabiya' },
  { label: 'Al Bayda', value: 'al bayda' },
  { label: 'Al Khums', value: 'al khums' },
  { label: 'Bani Walid', value: 'bani walid' },
  { label: 'Benghazi', value: 'benghazi' },
  { label: 'Brak', value: 'brak' },
  { label: 'Derna', value: 'derna' },
  { label: 'Ghadames', value: 'ghadames' },
  { label: 'Ghat', value: 'ghat' },
  { label: 'Hun', value: 'hun' },
  { label: 'Misrata', value: 'misrata' },
  { label: 'Murzuq', value: 'murzuq' },
  { label: 'Nalut', value: 'nalut' },
  { label: 'Sabha', value: 'sabha' },
  { label: 'Sirte', value: 'sirte' },
  { label: 'Tobruk', value: 'tobruk' },
  { label: 'Waddan', value: 'waddan' },
  { label: 'Zawiya', value: 'zawiya' },
  { label: 'Zliten', value: 'zliten' }
]
