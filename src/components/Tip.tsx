import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

export default function Tip({ children }: { children: React.ReactNode }) {
    return (
        <ListItem
            disableGutters
            alignItems="center"
            sx={{
                p: 2,
                mb: 2,
                borderRadius: '8px',
                backgroundColor: '#F5F5F5', // Grey100
                '& p': {
                    mb: 0,
                },
            }}
        >
            <ListItemIcon>
                <LightbulbOutlinedIcon />
            </ListItemIcon>
            <ListItemText>{children}</ListItemText>
        </ListItem>
    )
}
