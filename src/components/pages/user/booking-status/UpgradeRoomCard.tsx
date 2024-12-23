import React from 'react'

type UpgradeRoomCardProps = {
  image: string
  title: string
  price: number
  adults: number
  cancellationDate: string
  selected: boolean
  onSelect: () => void
}

const UpgradeRoomCard: React.FC<UpgradeRoomCardProps> = ({
  image,
  title,
  price,
  adults,
  cancellationDate,
  selected,
  onSelect
}) => {
  return (
    <div className={`flex items-center gap-4 border ${selected ? 'border-primary' : 'border-gray-300'} rounded-lg p-4`}>
      <input type='radio' checked={selected} onChange={onSelect} className='w-5 h-5 accent-primary' />
      {/* Image */}
      <div className='flex flex-1 items-start flex-col xs:flex-row gap-4'>
        <img src={image} alt={title} className='w-20 h-20 object-cover rounded-md' />

        {/* Details */}
        <div className='flex-1 space-y-2'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='text-sm text-gray-600'>
            Price for: <span className='font-bold'>{adults} adults</span>
          </p>
          <p className='text-sm text-green-500'>FREE Cancellation before {cancellationDate}</p>
        </div>

        {/* Price and Radio */}
        <div className='flex items-center gap-4'>
          <span className='text-lg font-bold text-gray-800'>${price}</span>
        </div>
      </div>
    </div>
  )
}

export default UpgradeRoomCard
