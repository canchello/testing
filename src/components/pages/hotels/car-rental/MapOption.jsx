import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const MapComp = dynamic(() => import('@/components/common/Map/selectMapLocation.jsx'), { ssr: false })

export default function MapOption({ className = "", onSelectLocation = (l) => { } }) {
  // const [openModal, setModal] = useState(false)
  const [coordinates, setCoordinates] = useState()

  const handleClick = () => {
    // setModal(true)
    document.getElementById('map_modal').showModal()
  }

  return (
    <div className={className}>
      <div className='cursor-pointer' onClick={handleClick}>
        <FontAwesomeIcon icon={faMapLocationDot} className='bg-white rounded-full p-3 ' />
      </div>
      <dialog id="map_modal" className="modal">
        <div className="modal-box p-3 min-w-72 md:min-w-[700px] xl:min-w-[900px]">
          <MapComp className="max-h-[50vh]" onSelectLocation={setCoordinates} />
          <div className="modal-action mt-2">
            <form method="dialog" className='space-x-2'>
              <button className="btn">Cancel</button>
              {coordinates &&
                <button className="btn bg-primary text-white" onClick={() => onSelectLocation(coordinates)}>Select</button>}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

