import { setQueryURL, SubscribeEmailURL } from '@/services/APIs/user'
import Axios from '@/libs/axios'
import { create } from 'zustand'
import { toast } from 'sonner'
import { applyPositionURL, getPositionOptionsURL } from '@/services/APIs/careers'

const initialValues = {
  messageModal: null,
  subscribedModal: null,
  locationCords: null
}

const appStore = create()(set => ({
  ...initialValues,
  setLocation: (data: any) => set({ locationCords: data }),
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
  }
}))

export default appStore
