import {
    GetUserDetailsResponse,
    UpdateUserDetails,
    UpdateUserDetailsResponse,
} from '@/@types/user'
import ApiService, { IResponse } from './ApiService'

export async function apiGetUserDetails() {
    return ApiService.fetchData<GetUserDetailsResponse>({
        url: '/api/user',
        method: 'get',
    })
}

export async function apiUpdateUserDetails(data: UpdateUserDetails) {
    try {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
            if (key === 'avatar') {
                const image = (data as any)[key]?.file as File
                if (image) formData.append(`avartar`, image)
            } else {
                formData.append(key, (data as any)[key] as string)
            }
        })
        return ApiService.fetchData<UpdateUserDetailsResponse>({
            url: '/api/user/update',
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'post',
            data,
        })
    } catch (error) {
        console.log('🚀 ~ apiUpdateUserDetails ~ error:', error)
    }
}
