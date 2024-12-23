import React from 'react'
import { faCreditCard, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'

const CardList = ({ cards = [], onDelete = () => {}, setSelectedCard = () => {} }: any) => {
  return (
    <div className='border rounded-lg'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div className='flex items-center space-x-2'>
          <FontAwesomeIcon icon={faCreditCard} />
          <h2 className='font-semibold text-gray-700'>Registered Cards</h2>
        </div>
        <button onClick={onDelete} className='text-red-500 flex gap-2 items-center'>
          <FontAwesomeIcon icon={faTrash} />
          <span className=''>Delete</span>
        </button>
      </div>

      {/* Render each card item */}
      <div className=''>
        {!!cards?.length ? (
          cards.map((card: any, index: any) => (
            <>
              <CardItem key={index} card={card} setSelectedCard={setSelectedCard} />
              {index < cards.length - 1 && <div className='border-b m-0' />}
            </>
          ))
        ) : (
          <div className='text-center my-4'>
            <span>No card details available</span>
          </div>
        )}
      </div>
    </div>
  )
}

const CardItem = ({ card, setSelectedCard }: any) => {
  const handleRadioChange = (data: any) => {
    setSelectedCard(data)
  }
  return (
    <div className='flex items-center justify-between p-4'>
      <input onChange={() => handleRadioChange(card)} type='radio' name='card' className='radio radio-sm mr-4' />
      <div className='flex-1 grid grid-cols-4 gap-4 text-sm'>
        <div>
          <span className='font-semibold text-gray-600'>Bank</span>
          <p>{card.bankName}</p>
        </div>
        <div>
          <span className='font-semibold text-gray-600'>Card Number</span>
          <p>{card.cardNumber}</p>
        </div>
        <div>
          <span className='font-semibold text-gray-600'>Cardholder's Name</span>
          <p>{card.cardHolderName}</p>
        </div>
        <div>
          <span className='font-semibold text-gray-600'>Expiry Date</span>
          <p>{dayjs(card.expiryDate).format('MM/YY')}</p>
        </div>
      </div>
    </div>
  )
}

export default CardList
