export const createRaiseTicketURL = {
  url: '/support/create',
  method: 'POST'
}

export const getRaiseTicketsListURL = {
  url: '/support/list',
  method: 'POST'
}

export const updateRaiseTicketURL = id => ({
  url: `/support/${id}`,
  method: 'PATCH'
})

export const deletRaiseTicketURL = id => ({
  url: `/support/${id}`,
  method: 'DELETE'
})

export const getRaiseTicketDetailsURL = id => ({
  url: `/support/${id}`,
  method: 'GET'
})
