import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import Axios from '@/libs/axios'
import { getHotelListURL } from '@/services/APIs/hotel'

const initialValues = {
  hotelFilters: {},
  hotelList: [],
  selectedRooms:[],
  selectedHotel:{}
}

const hotelStore = create()(
  persist(
    (set, get) => ({
      ...initialValues,
      setHotelFilters: (data: any) => set({ hotelFilters: data }),
      fetchHotelList: async (payload: any) => {
        try {
          set({ loadinghotels: true })
          const { data }: any = await Axios({
            ...getHotelListURL,
            data: payload
          })
          set({ hotelList: data?.data?.data || [] })
        } catch (error) {
          console.error(error)
        } finally {
          set({ loadinghotels: false })
        }
      },
      setSelectedRooms:(data:any)=> set({selectedRooms:data}),
      setselectedHotel:(data:any)=>set({selectedHotel:data})
    }),
    {
      name: 'hotel-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    }
  )
)

export default hotelStore
