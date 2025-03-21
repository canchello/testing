import { USER_ROLES } from '@/libs/constants'
import userStore from '@/stores/userStore'

export const getImage = (path: string, type = '') => {
  const isgoogleURL = path?.includes('googleusercontent.com')
  if (isgoogleURL) return path
  if (path) return `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/${path}`
  if (type === 'profile') return ''
  return 'https://via.placeholder.com/150'
}

export const getSubdomain = (url: string = window.location.href) => {
  try {
    // Parse the URL
    const urlObj = new URL(url)

    // Get the hostname (e.g., subdomain.localhost)
    const hostname = urlObj.hostname

    // Split the hostname into parts
    const parts = hostname.split('.')

    // Special handling for localhost
    if (hostname.includes('localhost')) {
      // Check if there is a subdomain for localhost
      return parts.length > 1 ? parts[0] : null
    }

    // For standard domains, check for subdomains
    if (parts.length > 2) {
      // Remove the last two parts (domain and TLD)
      return parts.slice(0, -2).join('.')
    }

    // No subdomain found
    return null
  } catch (error) {
    console.error('Invalid URL', error)
    return null
  }
}

export function redirectToSubdomain(subdomain?: string) {
  const { host, protocol, origin } = window.location
  let redirectURL = origin
  if (subdomain) redirectURL = protocol + '//' + [subdomain, host].join('.')
  if (origin !== redirectURL) window.location.href = redirectURL
}

export const routeToUserDomain = () => {
  const subdomain = getSubdomain() // Fetch the current subdomain
  const { user }: any = userStore.getState() // Get the user state from the store

  if (!user?.role) {
    console.error('User role not found.')
    return
  }

  const protocol = window.location.protocol // Automatically fetch the current protocol (http or https)
  const hostname = window.location.hostname // Fetch the full hostname (e.g., vendor.example.com)
  const port = window.location.port // Fetch the port (e.g., 3000)

  // Derive the root domain by stripping out the subdomain (if any)
  const rootDomain = hostname.includes('.')
    ? hostname.split('.').slice(-2).join('.') // Get the last two parts of the hostname (e.g., example.com)
    : hostname // Use hostname as-is if no dot is present (e.g., localhost)

  // Construct the base domain including the port if present
  const baseDomain = port ? `${rootDomain}:${port}` : rootDomain

  // Handle User role
  if (user.role === USER_ROLES.USER) {
    if (!subdomain || subdomain === 'vendor') {
      // Redirect to the main domain for USER role
      window.location.href = `${protocol}//${baseDomain}`
    }
  }
  // Handle Vendor role
  else if (user.role === USER_ROLES.VENDOR) {
    if (subdomain !== 'vendor') {
      // Redirect to the vendor subdomain
      window.location.href = `${protocol}//vendor.${baseDomain}`
    }
  }
  // Handle Admin role (Optional, based on your use case)
  else if (user.role === USER_ROLES.ADMIN) {
    if (subdomain !== 'admin') {
      // Redirect to the admin subdomain
      window.location.href = `${protocol}//admin.${baseDomain}`
    }
  } else {
    console.warn('Unhandled user role:', user.role)
    return false
  }
  return true
}

// const switchSubdomain = (newSubdomain) => {
//   const { hostname, protocol } = window.location;
//   const rootDomain = hostname.split('.').slice(-2).join('.'); // example.com
//   window.location.href = `${protocol}//${newSubdomain}.${rootDomain}${window.location.pathname}`;
// };

// Function to calculate the days and nights count
type DaysAndNights = { days: number; nights: number }

export function calculateDaysAndNights(checkIn: string, checkOut: string): DaysAndNights {
  // Parse dates to ensure they are valid Date objects
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  // Validate dates
  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    throw new Error('Invalid date format. Use a valid date format like YYYY-MM-DD.')
  }

  if (checkOutDate <= checkInDate) {
    throw new Error('Check-out date must be later than check-in date.')
  }

  // Calculate the difference in milliseconds
  const differenceInMs = checkOutDate.getTime() - checkInDate.getTime()

  // Convert milliseconds to days
  const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24))

  // Nights are always one less than days
  const nights = days - 1

  return { days, nights }
}

export const routeByRoleSubdomain = ({ user, subDomain }: any = {}) => {
  if (user.role === USER_ROLES.ADMIN && subDomain !== USER_ROLES.ADMIN) redirectToSubdomain(USER_ROLES.ADMIN)
  else if (user.role === USER_ROLES.VENDOR && subDomain !== USER_ROLES.VENDOR) redirectToSubdomain(USER_ROLES.VENDOR)
  else if (user.role === USER_ROLES.USER && subDomain) redirectToSubdomain()
}
