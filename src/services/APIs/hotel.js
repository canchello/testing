export const getHotelListURL = {
  url: '/property/list',
  method: 'POST'
}

export const getHotelByIdURL = id => ({
  url: `/property/${id}`,
  method: 'GET'
})

export const getFacilityList = {
  url: '/property-item/list',
  method: 'POST'
}

export const getRoomTypeListURL = {
  url: '/room-type/list',
  method: 'POST'
}
