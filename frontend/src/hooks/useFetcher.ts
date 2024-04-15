import { useAppDispatch } from './redux'
import { setNotify } from '~/reduxStore/globalSlice'
import axios from '~/api/axios'
import { AxiosRequestConfig } from 'axios'

const useFetcher = () => {
  const dispatch = useAppDispatch()
  const fetcher = async (
    url: string,
    config: AxiosRequestConfig = {}
  ) => {
    try {
      const res = await axios.get(url, config)
      return res.data
    } catch (error) {
      const ERROR = error as {
        response?: { data?: { message?: string } }
      }
      dispatch(
        setNotify({
          type: 'error',
          message:
            ERROR?.response?.data?.message ??
            'Đã xảy ra lỗi!'
        })
      )
    }
  }
  return fetcher
}

export default useFetcher
