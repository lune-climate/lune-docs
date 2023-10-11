import { isLoggedIn } from '@site/src/utils'
import React, { useEffect, useState } from 'react'

// Hides its contents if not logged in
const LoginSink = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState<boolean | undefined>()

    useEffect(() => {
        isLoggedIn().then((result) => setLoggedIn(result))
    }, [])

    return <>{loggedIn && children}</>
}

export default LoginSink
