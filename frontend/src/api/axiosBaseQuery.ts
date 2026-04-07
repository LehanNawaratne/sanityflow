import type { AxiosError, AxiosRequestConfig, Method } from "axios"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import { httpClient } from "@/api/httpClient"
import { logout } from "@/features/auth/authSlice"

type AxiosBaseQueryArgs = {
  url: string
  method?: Method
  data?: AxiosRequestConfig["data"]
  params?: AxiosRequestConfig["params"]
  headers?: AxiosRequestConfig["headers"]
}

type AxiosBaseQueryError = {
  status?: number
  data?: unknown
}

export const axiosBaseQuery = (): BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> => {
  return async ({ url, method = "GET", data, params, headers }, api) => {
    try {
      const result = await httpClient({
        url,
        method,
        data,
        params,
        headers,
      })

      return { data: result.data }
    } catch (axiosError) {
      const error = axiosError as AxiosError
      if (error.response?.status === 401) {
        api.dispatch(logout())
      }
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data ?? error.message,
        },
      }
    }
  }
}
