export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    user: {
        email: string
        avatar: string
    }
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
