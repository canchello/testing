export const getImage = (path: string, type = '') => {
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
