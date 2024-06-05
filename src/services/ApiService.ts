import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export interface IResponse<T> {
    status: string
    message: string
    statusCode: number
    reasonStatusCode: number
    data: T
}
const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown> | FormData>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<IResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((errors: AxiosError) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
