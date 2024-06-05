export type UpdateUserDetails = {
    avatar: any
    description: string
    dob: string
}

export type GetUserDetailsResponse = {
    id: number
    email: string
    avatar: string
    description: string
    dob: string
}

export type UpdateUserDetailsResponse = GetUserDetailsResponse
