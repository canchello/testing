import { faArrowRightFromBracket, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function StatisticsCard({ title = '', icon, number = '', change = '', moreLink }: any) {
  return (
    <div className='border rounded-lg p-2 space-y-4'>
      <div className='flex justify-between gap-2'>
        <div>
          <h6 className='text-sm text-gray-500'>{title}</h6>
          <h1 className='font-bold'>{number}</h1>
        </div>
        {icon && (
          <div className=''>
            <div className='bg-orange-100 rounded-lg px-2 py-1'>
              <FontAwesomeIcon icon={icon} />
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-between gap-2'>
        {change && (
          <p className='flex gap-1 text-sm items-center'>
            <span className='bg-green-100 rounded-md px-2 py-1 space-x-1'>
              <FontAwesomeIcon icon={faArrowTrendUp} />
              <span>{change}%</span>
            </span>
            <span>from last week</span>
          </p>
        )}
        {moreLink && (
          <Link href={moreLink}>
            <span className='text-link text-primary cursor-pointer text-sm mr-2'>View All</span>
          </Link>
        )}
      </div>
    </div>
  )
}
