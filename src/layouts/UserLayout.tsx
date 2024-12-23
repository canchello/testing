import type { ChildrenType } from '@/types'
import Link from 'next/link'
import preferenceIcon from '@/assets/images/preferencesProfile.png'
import personalDetailsIcon from '@/assets/images/personalDetailsProfile.png'
import paymentDetailsIcon from '@/assets/images/paymentDetailsProfile.png'
import securityIcon from '@/assets/images/securityProfile.png'
import Image, { StaticImageData } from 'next/image'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/libs/constants'
import { faCar, faHotel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface NavigateMenuProps {
  label: string
  icon: any
  image?: any
  href: string
}

const NavigateMenuItems: React.FC<NavigateMenuProps> = ({ label, href, icon, image }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div
        className={`flex gap-4 items-center p-3 rounded-md ${isActive ? 'bg-custom-orange text-black' : 'text-white '}`}
      >
        {/* <FaUser className="mr-2" /> */}
        {image ? (
          <Image style={{ filter: `invert(${isActive ? 1 : 0})` }} src={icon} alt={label} />
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
        <p className='font-medium'>{label}</p>
      </div>
    </Link>
  )
}

const UserLayout = ({ children }: ChildrenType) => {
  const pathname = usePathname()
  return (
    <div className='flex flex-col md:flex-row p-8 gap-5 w-full'>
      <div className='hidden md:block' style={{ minWidth: '260px' }}>
        <div className='bg-custom-dark-blue flex p-4 rounded-lg'>
          <div className='w-full space-y-2'>
            {userRoutes
              .filter(i => (pathname.includes('profile') ? i.image : !i.image))
              .map((item, index) => {
                return (
                  <NavigateMenuItems
                    key={index}
                    label={item.title}
                    icon={item.icon}
                    image={item.image}
                    href={item.href}
                  />
                )
              })}
          </div>
        </div>
      </div>
      <div className='w-full'>{children}</div>
    </div>
  )
}

const userRoutes = [
  { title: 'Personal Details', icon: personalDetailsIcon, image: true, href: ROUTES.PROFILE.PERSONAL_DETAILS },
  { title: 'Preferences', icon: preferenceIcon, image: true, href: ROUTES.PROFILE.PREFERENCES },
  { title: 'Security', icon: securityIcon, image: true, href: ROUTES.PROFILE.SECURITY },
  { title: 'Payment Details', icon: paymentDetailsIcon, image: true, href: ROUTES.PROFILE.PAYMENT_DETAILS },
  // *******************************************************************************************
  { title: 'Stay', icon: faHotel, image: false, href: ROUTES.HOTEL.STAYS },
  { title: 'Taxi Service', icon: faCar, image: false, href: ROUTES.HOTEL.CAR_RENTAL }
]

export default UserLayout
