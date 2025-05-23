'use client'

import { useAuth } from '@/hooks/auth'
// import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
// import DynamicBackground from '@/components/backgroundComponent/DynamicBackground'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen ">
            {/* <Navigation user={user} /> */}

            <main>
                {/* <DynamicBackground/> */}
                {children}
                <ToastContainer position="top-right" theme="dark"/>
                </main>
        </div>
    )
}

export default AppLayout
