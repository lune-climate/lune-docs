import { Box, Grid, SxProps } from '@mui/material'
import * as React from 'react'

export interface ThreeColumnLayoutProps {
    children: React.ReactNode[]
    sx?: SxProps
}

const ThreeColumnLayout = ({ children, sx, ...rest }: ThreeColumnLayoutProps) => {
    if (children?.length !== 3) {
        throw new Error(`ThreeColumnLayout accepts three children only, given ${children.length}`)
    }

    return (
        <Box
            sx={{
                maxHeight: '100%',
                overflow: 'auto',
                ...sx,
            }}
        >
            <Grid
                container
                spacing={{
                    xs: 4,
                    sm: 4,
                    md: 10,
                    lg: 10,
                    xl: 10,
                }}
                sx={{}}
                {...rest}
            >
                <Grid item sx={{}} xs={12} sm={4} md={4} lg={4} xl={4}>
                    {children[0]}
                </Grid>
                <Grid item sx={{}} xs={12} sm={4} md={4} lg={4} xl={4}>
                    {children[1]}
                </Grid>
                <Grid item sx={{}} xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: '0',
                        }}
                    >
                        {children[2]}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ThreeColumnLayout
