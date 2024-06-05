import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'profile',
        path: '/profile',
        component: lazy(() => import('@/views/Settings/Settings')),
        authority: [],
        meta: {
            layout: 'stackedSide',
        },
    },
]
