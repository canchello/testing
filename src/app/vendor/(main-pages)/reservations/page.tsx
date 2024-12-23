'use client'
import React, { useState } from 'react'
import Loader from '@/components/common/Loader'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Reservations = () => {
  const [reservtionList, setReservationList] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Reservation List</h1>
        </div>
        <Filters />
      </div>
      <div className='justify-items-center'>
        {!!reservtionList.length ? (
          <div className=' rounded-lg'>
            {/* <Table
              dataURL={getRaiseTicketsListURL}
              refetchData={refetchData}
              enablePagination={true}
              setRefetchData={setRefetchData}
              columns={columns}
              selectableRows={true}
              rowClickable={true}
              onRowClick={rowClickHandler}
              onSelectedRowsChange={handleSelectedRowChange}
            /> */}
          </div>
        ) : loading ? (
          <Loader />
        ) : (
          <div className='justify-items-center gap-2 my-8'>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <p>No reservation found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Reservations
