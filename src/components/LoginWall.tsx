import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { Box } from '@mui/material'
import { isLoggedIn } from '@site/src/utils'
import { Button } from 'lune-ui-lib'
import React, { useEffect, useState } from 'react'

// Blurs its contents and show a login button
const LoginWall = ({ children }: { children: React.ReactNode }) => {
    const [loggedIn, setLoggedIn] = useState<boolean | undefined>()
    const { siteConfig } = useDocusaurusContext()
    const location = useLocation()

    useEffect(() => {
        isLoggedIn().then((result) => setLoggedIn(result))
    }, [])

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            {!loggedIn && (
                <Box
                    sx={{
                        backdropFilter: 'blur(4px)',
                        background: 'rgba(255, 255, 255, 0.70)',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        zIndex: '10',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        className="whiteHover"
                        leftIcon={<ArrowCircleRightIcon />}
                        sx={{ textTransform: 'none' }}
                        href={`${siteConfig.customFields.DASHBOARD_DOMAIN}/login?force-relogin=true&redirect=${siteConfig.customFields.DOCS_DOMAIN}${location.pathname}`}
                    >
                        Login to access full methodology
                    </Button>
                </Box>
            )}
            {children}
        </Box>
    )
}

export default LoginWall
