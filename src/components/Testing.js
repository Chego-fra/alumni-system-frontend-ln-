'use client'
import { useAuth } from "@/hooks/auth"

const Testing = () => {
    const {  user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
        </>
    )
}

export default Testing
