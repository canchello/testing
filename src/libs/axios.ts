import axios from 'axios'

import LOCAL_STORAGE_CONSTANTS from '@/constants/localstorage'
import userStore from '@/stores/userStore'
import { toast } from 'sonner'

let isRefreshing = false
let refreshSubscribers = []

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  // withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Allow-Access-Control-Allow-Origin': '*'
  }
})

const requestHandler = (config: any) => {
  if (!window.navigator.onLine) {
    Promise.reject('Network Error.')
  }

  let token = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN)

  // canChangeRegion: true

  if (!config.headers.Authorization) {
    config.headers.Authorization = token ? `Bearer ${token}` : null
  }

  return Promise.resolve(config)
}

//request interceptor
Axios.interceptors.request.use(
  async config => {
    return requestHandler(config)
  },
  error => Promise.reject(error)
)

const errorHandler = async (error: any) => {
  let errorMessage = ''
  // Case when user closes OTP model
  if (error.code === 'ERR_CANCELED') {
    return Promise.reject(error)
  }
  if (!error.response) {
    errorMessage = error.message || 'Network error - something went wrong'
    // message.error(errorMessage);
  }

  const originalRequest = error.config
  if (error.response && error.response.status === 401 && error.response.data.status === 'SESSION_EXPIRED') {
    if (!isRefreshing) {
      // execute on first request
      isRefreshing = true
      try {
        // const jwtToken = await dispatch(getNewToken());
        const jwtToken = 'new Token'
        originalRequest.headers['Authorization'] = `Bearer ${jwtToken}`
        // processQueue(null, jwtToken);

        return Axios(originalRequest)
      } catch (err) {
        // processQueue(err, null);
        // return Promise.reject(error);
      } finally {
        isRefreshing = false
        refreshSubscribers = []
      }
    } else {
      // return new Promise((resolve) => {
      //     refreshSubscribers.push((token) => {
      //         originalRequest.headers[
      //             "Authorization"
      //         ] = `Bearer ${token}`;
      //         resolve(Axios(originalRequest));
      //     });
      // });
    }
  }

  if (error.response && error.response.data) {
    let errorResponse = error.response.data
    if (!!errorResponse.data) errorMessage = errorResponse.data?.[0]?.message || errorResponse.data?.[0]?.msg
    else if (typeof errorResponse.message === 'string') errorMessage = errorResponse.message
    else if (typeof errorResponse.message === 'object') errorMessage = errorResponse.message?.errors?.[0]?.message
    else if (!!errorResponse?.data?.message) errorMessage = errorResponse.data.message
    else errorMessage = 'Something went wrong'

    toast.error(errorMessage)
    console.log('errorMessage', errorMessage)

    if (['UNAUTHORIZED'].includes(error.response.data.response) || [403, 401].includes(error.response.status)) {
      const { clearAuthState }: any = userStore.getState()
      clearAuthState()
    }
  }
  return Promise.reject({ errorMessage, ...error })
}

const responseHandler = (response: any) => {
  return Promise.resolve(response)
}

//response interceptor
Axios.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error)
)

export default Axios
