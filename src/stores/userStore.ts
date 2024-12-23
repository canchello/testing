import { create } from 'zustand'
import LOCAL_STORAGE_CONSTANTS from '@/constants/localstorage'
import Cookies from 'js-cookie'
import Axios from '@/libs/axios'
import { fetchUserProfileURL, logoutUserURL } from '@/services/APIs/user'

const initialValues = {
  wishListData:[]
}

const userStore = create()((set, get) => ({
  ...initialValues,
  setUser: (user: any = null) => {
    set({ user })
    if (user?.token) localStorage.setItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, user?.token)
    if (user?.verificationToken)
      localStorage.setItem(LOCAL_STORAGE_CONSTANTS.VERIFICATION_TOKEN, user?.verificationToken)
  },
  // setGoogleAuth: (googleAuth = false) => set({ googleAuth }),
  clearAuthState: async () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.VERIFICATION_TOKEN)
      Cookies.remove('token')
      // .removeItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN)
      set({ user: null })
    } catch (error) {
      console.log('error', error)
    }
  },
  logout: async () => {
    try {
      const response = await Axios({ ...logoutUserURL, data: {} })
      if (response) {
        localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN)
        localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.VERIFICATION_TOKEN)
        Cookies.remove('token')
        // .removeItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN)
        set({ user: null })
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  fetchUserProfile: async (token = '', cb = () => {}) => {
    try {
      set({ fetchingUser: true })
      const { data: res }: any = await Axios({
        ...fetchUserProfileURL,
        headers: {
          Authorization: token && token !== 'undefined' ? `Bearer ${token}` : null
        }
      })
      if (res.status === 1) {
        set({ user: res.data })
        localStorage.setItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, token)
        // toast.success(`Welcome! ${res.data.firstName || res.data.email || "You've logged In."}`)
        cb()
      }
    } catch (error) {
      console.error(error)
    } finally {
      set({ fetchingUser: false })
    }
  },
  updateUserProfile: async () => {
    try {
      // set({ updatingUser: true })
      // const { data: res }: any = await Axios({ ...fetchUserProfileURL })
      // if (res.status === 1) {
      //   set({ user: res.data })
      // }
    } catch (error) {
      console.error(error)
    } finally {
      set({ updatingUser: false })
    }
  },

  setUserWishList: async(data:any)=>{
    set({wishListData:data})
  }
}))

export default userStore
