import { useState, useEffect, Suspense, lazy } from 'react'
import Tabs from '@/components/ui/Tabs'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetUserDetails } from '@/services/UserService'
import { ProfileFormModel } from './components/Profile'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { useAppSelector } from '@/store'

type AccountSetting = {
    email: string
    avatar: string
    description: string
    dob: string
}

const Profile = lazy(() => import('./components/Profile'))

const { TabNav, TabList } = Tabs

const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    profile: { label: 'Profile', path: '/' },
}

const Settings = () => {
    const [currentTab, setCurrentTab] = useState('profile')
    const [data, setData] = useState<Partial<AccountSetting>>({})
    const { avatar, email } = useAppSelector((state) => state.auth.user)
    // const [showToast, setShowToast] = useState(true)

    const navigate = useNavigate()

    const location = useLocation()

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const fetchData = async () => {
        const response = await apiGetUserDetails()
        setData(response.data)
    }

    useEffect(() => {
        setCurrentTab(path)
        if (isEmpty(data)) {
            fetchData()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'profile' && (
                            <Profile data={data as ProfileFormModel} />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings
