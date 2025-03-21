import { setQueryURL, SubscribeEmailURL } from '@/services/APIs/user'
import Axios from '@/libs/axios'
import { create } from 'zustand'
import { toast } from 'sonner'
import { applyPositionURL, getPositionOptionsURL } from '@/services/APIs/careers'
import { facilityListURL, vendorRoomsList } from '@/services/APIs/vendor'
import { facilityTypes } from '@/libs/constants'

const initialValues = {
  messageModal: null,
  subscribedModal: null,
  locationCords: null,
  couponData: null,
  cities: []
}

const appStore = create()(set => ({
  ...initialValues,
  setLocation: (data: any) => set({ locationCords: data }),
  setCities: (data: any = []) => set({ cities: data }),
  setMessageModal: (messageModal: any) => set({ messageModal }),
  setSubscribedModal: (subscribedModal: any) => set({ subscribedModal }),
  subscribeEmail: async (data: any) => {
    try {
      set({ subscribing: true })
      const { data: res }: any = await Axios({ ...SubscribeEmailURL, data })
      if (res) {
        set({ subscribedModal: true })
      }
    } catch (error) {
      console.error(error)
    } finally {
      set({ subscribing: false })
    }
  },
  setQuery: async (data: any) => {
    try {
      set({ loading: true })
      const { data: res }: any = await Axios({ ...setQueryURL, data })
      if (res.data) {
        toast.success(res.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },
  fetchPositionsOptions: async (data: any) => {
    try {
      set({ loading: true })
      const { data: res }: any = await Axios({ ...getPositionOptionsURL, data })
      return res.data
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },
  applyForPosition: async (data: any) => {
    try {
      set({ isLoading: true })
      const { data: res }: any = await Axios({ ...applyPositionURL, data })
      toast.success('Successfully Applied for position')
      return res.data
    } catch (error) {
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  },
  fetchFacility: async () => {
    try {
      set({ fetchingFacility: true })
      const { data: res }: any = await Axios({
        ...facilityListURL,
        data: {
          query: { type: facilityTypes.FACILITY },
          options: { pagination: false }
        }
      })
      set({ facilites: res.data?.data || [] })
    } catch (error) {
      console.error(error)
    } finally {
      set({ fetchingFacility: false })
    }
  },
  fetchVendorRoomList: async (data: any) => {
    try {
      set({ fetchingRoomsList: true })
      const { data: res }: any = await Axios({
        ...vendorRoomsList,
        data: data
      })
      set({ vendorRoomsList: res?.data?.data || [] })
    } catch (error) {
      console.error(error)
    } finally {
      set({ fetchingRoomsList: false })
    }
  },
  setCouponData: (couponData: any) => set({ couponData })
}))

export default appStore
