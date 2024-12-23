export const createRaiseTicketURL = {
  url: '/support/create',
  method: 'POST'
}

export const getRaiseTicketsListURL = {
  url: '/support/list',
  method: 'POST'
}

export const deletRaiseTicketURL = id => ({
  url: `/support/${id}`,
  method: 'DELETE'
})

export const getRaiseTicketDetailsURL = id =>({
  url:`/support/${id}`,
  method:"GET"
})