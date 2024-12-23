export const getHotelListURL = {
  url: '/property/list',
  method: 'POST'
}

export const getHotelByIdURL = id => ({
  url: `/property/${id}`,
  method: 'GET'
})
